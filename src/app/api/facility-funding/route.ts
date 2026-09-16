import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { facilityFundingSchema } from '@/lib/validations';
import { sendEmail, generateFacilityFundingAdminEmail, generateFacilityFundingClientReceipt } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let rawBody: Record<string, any> = {};
    let documentFileMeta: { originalName: string; size: number } | undefined = undefined;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();

      // Honeypot bot protection
      const honeypot = formData.get('honeypot');
      if (honeypot && String(honeypot).length > 0) {
        return NextResponse.json({ success: true, message: 'Inquiry received' });
      }

      // Check document file (optional)
      const doc = formData.get('documentFile');
      if (doc && doc instanceof File && doc.size > 0) {
        const ext = doc.name.substring(doc.name.lastIndexOf('.')).toLowerCase();
        if (!['.pdf', '.doc', '.docx'].includes(ext)) {
          return NextResponse.json(
            { success: false, error: 'Validation failed', errors: { documentFile: ['Document must be a PDF, DOC, or DOCX file'] } },
            { status: 422 }
          );
        }
        if (doc.size > 10 * 1024 * 1024) {
          return NextResponse.json(
            { success: false, error: 'Validation failed', errors: { documentFile: ['Document file exceeds the 10MB limit'] } },
            { status: 422 }
          );
        }
        documentFileMeta = { originalName: doc.name, size: doc.size };
      }

      formData.forEach((value, key) => {
        if (key === 'documentFile') return;
        if (key === 'privacyConsent') {
          rawBody[key] = value === 'true' || value === 'on' || value === '1';
        } else {
          rawBody[key] = typeof value === 'string' ? value : '';
        }
      });

      if (documentFileMeta && !rawBody.documentName) {
        rawBody.documentName = documentFileMeta.originalName;
      }
    } else {
      rawBody = await request.json();

      // Honeypot bot protection
      if (rawBody.honeypot) {
        return NextResponse.json({ success: true, message: 'Inquiry received' });
      }
    }

    // Schema validation via Zod
    const validationResult = facilityFundingSchema.safeParse(rawBody);
    if (!validationResult.success) {
      const errorMap = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: errorMap },
        { status: 422 }
      );
    }

    const validatedData = validationResult.data;

    const record = {
      ...validatedData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      documentFile: documentFileMeta,
    };

    // 1. Dispatch Admin Alert Email
    const adminRecipient = process.env.ADMIN_NOTIFICATION_EMAIL || 'peteradewaletomiwa@gmail.com';
    const adminEmail = generateFacilityFundingAdminEmail(record);
    await sendEmail({
      to: adminRecipient,
      subject: adminEmail.subject,
      html: adminEmail.html,
      type: 'facility_funding_admin_alert',
    });

    // 2. Dispatch Client Confirmation Receipt
    const clientEmail = generateFacilityFundingClientReceipt(record);
    await sendEmail({
      to: record.email,
      subject: clientEmail.subject,
      html: clientEmail.html,
      type: 'facility_funding_client_receipt',
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you. A practice specialist will follow up to discuss facility funding opportunities.',
      referenceId: record.id,
      timestamp: record.createdAt,
    });
  } catch (error: any) {
    console.error('Facility funding API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
