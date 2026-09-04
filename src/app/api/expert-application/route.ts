import { NextResponse } from 'next/server';
import { expertApplicationSchema } from '@/lib/validations';
import { saveExpertApplication } from '@/lib/storage';
import { sendEmail } from '@/lib/email';
import { SITE_EMAIL } from '@/lib/constants';

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();

    if (rawBody.honeypot) {
      return NextResponse.json({ success: true, message: 'Application received' });
    }

    const validationResult = expertApplicationSchema.safeParse(rawBody);
    if (!validationResult.success) {
      const errorMap = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: errorMap },
        { status: 422 }
      );
    }

    const record = await saveExpertApplication(validationResult.data);

    // Notify Admin
    await sendEmail({
      to: process.env.ADMIN_NOTIFICATION_EMAIL || SITE_EMAIL,
      subject: `[Expert Fellowship Application] ${record.fullName} — ${record.primaryDiscipline}`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; color: #121514;">
          <h2 style="color: #0D4A2B;">New Expert Fellowship Application</h2>
          <p><strong>Applicant:</strong> ${record.fullName}</p>
          <p><strong>Discipline:</strong> ${record.primaryDiscipline}</p>
          <p><strong>Experience:</strong> ${record.yearsOfExperience}</p>
          <p><strong>Country:</strong> ${record.country}</p>
          <p><strong>Email:</strong> ${record.email}</p>
          <p><strong>Telephone:</strong> ${record.telephone || 'N/A'}</p>
          <p><strong>Regional Desk:</strong> ${record.regionalDeskPreference || 'Pan-African'}</p>
          ${record.linkedInUrl ? `<p><strong>LinkedIn:</strong> <a href="${record.linkedInUrl}">${record.linkedInUrl}</a></p>` : ''}
          <div style="margin-top: 16px; padding: 12px; background: #F4F4F0; border-radius: 8px;">
            <strong>Track Record Summary:</strong><br/>
            ${record.credentialsSummary.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `,
      type: 'expert_fellowship_application',
    });

    // Notify Applicant
    await sendEmail({
      to: record.email,
      subject: `SportLead Africa Expert Fellowship: Application Received [Ref #${record.id.slice(0, 8)}]`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; color: #121514;">
          <h2 style="color: #0D4A2B;">SportLead Africa Expert Network</h2>
          <p>Dear ${record.fullName},</p>
          <p>Thank you for submitting your credentials for the <strong>SportLead Africa Consulting Fellowship</strong> in <strong>${record.primaryDiscipline}</strong>.</p>
          <p>Our practice governance committee evaluates applications on a rolling quarterly cadence. A coordinator will contact you should your background align with ongoing or upcoming continental advisory mandates.</p>
          <p style="font-size: 13px; color: #666; margin-top: 24px;">Application Reference: ${record.id}</p>
        </div>
      `,
      type: 'expert_fellowship_receipt',
    });

    return NextResponse.json({
      success: true,
      message: 'Your fellowship credentials have been recorded. Our committee reviews profiles on a rolling basis.',
      referenceId: record.id,
    });
  } catch (error: any) {
    console.error('Expert Application API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
