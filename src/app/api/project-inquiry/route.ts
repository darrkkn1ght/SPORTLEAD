import { NextResponse } from 'next/server';
import { projectInquirySchema } from '@/lib/validations';
import { saveProjectInquiry } from '@/lib/storage';
import { sendEmail, generateProjectInquiryAdminEmail, generateProjectInquiryClientReceipt } from '@/lib/email';
import { SITE_EMAIL } from '@/lib/constants';

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();

    // Honeypot bot protection
    if (rawBody.honeypot) {
      return NextResponse.json({ success: true, message: 'Inquiry received' });
    }

    // Schema validation via Zod
    const validationResult = projectInquirySchema.safeParse(rawBody);
    if (!validationResult.success) {
      const errorMap = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: errorMap },
        { status: 422 }
      );
    }

    const validatedData = validationResult.data;

    // 1. Save mandate to persistent storage
    const record = await saveProjectInquiry(validatedData);

    // 2. Dispatch Senior Practice Alert Email
    const adminEmail = generateProjectInquiryAdminEmail(record);
    await sendEmail({
      to: process.env.ADMIN_NOTIFICATION_EMAIL || SITE_EMAIL,
      subject: adminEmail.subject,
      html: adminEmail.html,
      type: 'mandate_admin_brief',
    });

    // 3. Dispatch Client Confirmation Receipt
    const clientEmail = generateProjectInquiryClientReceipt(record);
    await sendEmail({
      to: record.email,
      subject: clientEmail.subject,
      html: clientEmail.html,
      type: 'mandate_client_receipt',
    });

    return NextResponse.json({
      success: true,
      message: 'Your project mandate brief has been registered. Our senior practice leadership will review and respond within 48 hours.',
      referenceId: record.id,
      timestamp: record.createdAt,
    });
  } catch (error: any) {
    console.error('Project inquiry API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
