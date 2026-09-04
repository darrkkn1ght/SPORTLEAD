import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';
import { saveContactSubmission } from '@/lib/storage';
import { sendEmail, generateContactAdminEmail } from '@/lib/email';
import { SITE_EMAIL } from '@/lib/constants';

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();

    // Honeypot anti-spam check: bots fill hidden honeypot fields
    if (rawBody.honeypot) {
      return NextResponse.json({ success: true, message: 'Message received' });
    }

    // Schema validation via Zod
    const validationResult = contactSchema.safeParse(rawBody);
    if (!validationResult.success) {
      const errorMap = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: errorMap },
        { status: 422 }
      );
    }

    const validatedData = validationResult.data;

    // 1. Save to persistent storage
    const record = await saveContactSubmission(validatedData);

    // 2. Dispatch Admin Notification Email
    const adminEmail = generateContactAdminEmail(record);
    await sendEmail({
      to: process.env.ADMIN_NOTIFICATION_EMAIL || SITE_EMAIL,
      subject: adminEmail.subject,
      html: adminEmail.html,
      type: 'contact_admin_alert',
    });

    // 3. Dispatch Client Acknowledgment Email
    await sendEmail({
      to: record.email,
      subject: `SportLead Africa: Message Received [Ref #${record.id.slice(0, 8)}]`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; color: #121514;">
          <h2 style="color: #0D4A2B;">SportLead Africa</h2>
          <p>Dear ${record.name},</p>
          <p>Thank you for contacting SportLead Africa regarding <strong>${record.subject}</strong>.</p>
          <p>We have received your message and our communications team will respond via your preferred contact method (${record.preferredContact}) shortly.</p>
          <p style="margin-top: 24px; font-size: 13px; color: #666;">Inquiry Reference ID: ${record.id}</p>
        </div>
      `,
      type: 'contact_client_receipt',
    });

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been received. Our team will contact you shortly.',
      referenceId: record.id,
    });
  } catch (error: any) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
