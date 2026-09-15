import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { expertApplicationSchema } from '@/lib/validations';
import { sendEmail } from '@/lib/email';
import { SITE_EMAIL } from '@/lib/constants';

/**
 * NOTE — File uploads (CV, photo, certificates) are accepted from the form
 * and their metadata is included in the admin notification email, but the
 * files themselves are NOT persisted anywhere yet. On a serverless platform
 * (Vercel) the function filesystem is read-only and ephemeral.
 *
 * To persist uploads in production, integrate an object store (e.g. Vercel
 * Blob, AWS S3, Cloudflare R2) and stream the file buffers there. For now,
 * submissions still go through and the admin is notified with all text data.
 */

interface FileMetadata {
  originalName: string;
  mimeType: string;
  size: number;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let rawFields: Record<string, any> = {};
    let cvFileMeta: FileMetadata | undefined = undefined;
    let photoFileMeta: FileMetadata | undefined = undefined;
    const certificateFileMetas: FileMetadata[] = [];

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();

      // Check honeypot
      const honeypot = formData.get('honeypot');
      if (honeypot && String(honeypot).length > 0) {
        return NextResponse.json({ success: true, message: 'Application received' });
      }

      // Collect CV file metadata (required)
      const cv = formData.get('cvFile');
      if (cv && cv instanceof File && cv.size > 0) {
        cvFileMeta = { originalName: cv.name, mimeType: cv.type, size: cv.size };
      } else {
        return NextResponse.json(
          { success: false, error: 'Validation failed', errors: { cvFile: ['CV document upload (PDF/DOC) is required'] } },
          { status: 422 }
        );
      }

      // Collect photo file metadata (required)
      const photo = formData.get('photoFile');
      if (photo && photo instanceof File && photo.size > 0) {
        photoFileMeta = { originalName: photo.name, mimeType: photo.type, size: photo.size };
      } else {
        return NextResponse.json(
          { success: false, error: 'Validation failed', errors: { photoFile: ['Professional photograph upload (JPG/PNG) is required'] } },
          { status: 422 }
        );
      }

      // Collect certificate file metadata (optional, multiple)
      const certificates = formData.getAll('certificateFiles');
      for (const cert of certificates) {
        if (cert && cert instanceof File && cert.size > 0) {
          certificateFileMetas.push({ originalName: cert.name, mimeType: cert.type, size: cert.size });
        }
      }

      // Parse text & boolean fields
      formData.forEach((value, key) => {
        if (key === 'cvFile' || key === 'photoFile' || key === 'certificateFiles') return;
        if (
          key === 'consentVerification' ||
          key === 'consentPublication' ||
          key === 'acknowledgementNoGuarantee' ||
          key === 'privacyConsent'
        ) {
          rawFields[key] = value === 'true' || value === 'on' || value === '1';
        } else {
          rawFields[key] = typeof value === 'string' ? value : '';
        }
      });
    } else {
      // JSON payload
      rawFields = await request.json();
      if (rawFields.honeypot) {
        return NextResponse.json({ success: true, message: 'Application received' });
      }
    }

    // Validate fields using Zod
    const validationResult = expertApplicationSchema.safeParse(rawFields);
    if (!validationResult.success) {
      const errorMap = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: errorMap },
        { status: 422 }
      );
    }

    const validatedData = validationResult.data;

    // Build record with generated metadata (no file-system storage)
    const record = {
      ...validatedData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      cvFile: cvFileMeta,
      photoFile: photoFileMeta,
      certificateFiles: certificateFileMetas.length > 0 ? certificateFileMetas : undefined,
    };

    // Notify Admin
    const adminRecipient = process.env.ADMIN_NOTIFICATION_EMAIL || 'peteradewaletomiwa@gmail.com';
    await sendEmail({
      to: adminRecipient,
      subject: `[Expert Network Application] ${record.fullName} — ${record.primaryDiscipline}`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; color: #121514; background: #FAFAF8;">
          <div style="background: #ffffff; border: 1px solid #E5E5DE; border-radius: 12px; padding: 28px; max-width: 680px; margin: 0 auto;">
            <h2 style="color: #0D4A2B; margin-top: 0; border-bottom: 2px solid #0D4A2B; padding-bottom: 12px;">New Expert Network Application</h2>
            
            <h3 style="color: #333; margin-top: 20px;">1. Personal & Contact</h3>
            <p><strong>Full Name:</strong> ${record.fullName} ${record.preferredName ? `(${record.preferredName})` : ''}</p>
            <p><strong>Email:</strong> <a href="mailto:${record.email}">${record.email}</a></p>
            <p><strong>Telephone/WhatsApp:</strong> ${record.telephone}</p>
            <p><strong>Location:</strong> ${record.city}, ${record.country}</p>

            <h3 style="color: #333; margin-top: 20px;">2. Professional Background</h3>
            <p><strong>Current Title:</strong> ${record.jobTitle}</p>
            <p><strong>Organisation / Practice:</strong> ${record.organisation}</p>
            <p><strong>Primary Discipline:</strong> ${record.primaryDiscipline}</p>
            <p><strong>Secondary Disciplines:</strong> ${record.secondaryDisciplines || 'N/A'}</p>
            <p><strong>Years of Experience:</strong> ${record.yearsOfExperience}</p>
            <p><strong>Academic Qualifications:</strong> ${record.academicQualifications}</p>
            <p><strong>Professional Registrations:</strong> ${record.professionalRegistrations || 'N/A'}</p>

            <h3 style="color: #333; margin-top: 20px;">3. Experience & Scope</h3>
            <p><strong>Services Provided:</strong> ${record.servicesProvided}</p>
            <p><strong>Sector / Facility Experience:</strong> ${record.sectorExperience}</p>
            <p><strong>Work Regions:</strong> ${record.workRegions}</p>
            <p><strong>Travel Availability:</strong> ${record.travelAvailability}</p>
            <p><strong>Languages:</strong> ${record.languages}</p>
            <p><strong>Preferred Engagement:</strong> ${record.engagementType}</p>

            <div style="background: #F4F4F0; padding: 14px; border-radius: 8px; margin: 12px 0;">
              <strong>Key Sport Sector Project Experience:</strong><br/>
              ${record.projectExperience.replace(/\n/g, '<br/>')}
            </div>

            <h3 style="color: #333; margin-top: 20px;">4. Links & Uploads</h3>
            <p><strong>LinkedIn:</strong> <a href="${record.linkedInUrl}">${record.linkedInUrl}</a></p>
            ${record.websiteUrl ? `<p><strong>Website / Portfolio:</strong> <a href="${record.websiteUrl}">${record.websiteUrl}</a></p>` : ''}
            <p><strong>CV File:</strong> ${record.cvFile?.originalName || 'Not provided'}</p>
            <p><strong>Photo File:</strong> ${record.photoFile?.originalName || 'Not provided'}</p>
            <p><strong>Certificates:</strong> ${record.certificateFiles?.length ? record.certificateFiles.map(c => c.originalName).join(', ') : 'None submitted'}</p>
            <p style="font-size: 12px; color: #999;"><em>Note: File uploads are included in the form submission but are not yet persisted to cloud storage. Contact the applicant directly to request documents if needed.</em></p>
            
            <div style="background: #F4F4F0; padding: 14px; border-radius: 8px; margin: 12px 0;">
              <strong>References:</strong><br/>
              ${record.references.replace(/\n/g, '<br/>')}
            </div>

            <h3 style="color: #333; margin-top: 20px;">5. Narrative</h3>
            <div style="background: #F4F4F0; padding: 14px; border-radius: 8px; margin: 12px 0;">
              <strong>Biography:</strong><br/>
              ${record.bio.replace(/\n/g, '<br/>')}
            </div>
            <div style="background: #F4F4F0; padding: 14px; border-radius: 8px; margin: 12px 0;">
              <strong>Statement of Interest:</strong><br/>
              ${record.statementOfInterest.replace(/\n/g, '<br/>')}
            </div>

            <p style="font-size: 12px; color: #777; margin-top: 24px; border-top: 1px solid #EEE; padding-top: 12px;">
              Application Ref ID: ${record.id} | Submitted: ${record.createdAt}
            </p>
          </div>
        </div>
      `,
      type: 'expert_network_application',
    });

    // Notify Applicant
    await sendEmail({
      to: record.email,
      subject: `SportLead Africa Expert Network: Application Acknowledged [Ref #${record.id.slice(0, 8)}]`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; color: #121514; background: #FAFAF8;">
          <div style="background: #ffffff; border: 1px solid #E5E5DE; border-radius: 12px; padding: 32px; max-width: 600px; margin: 0 auto;">
            <div style="font-size: 18px; font-weight: 800; color: #0D4A2B; margin-bottom: 20px;">SPORTLEAD AFRICA</div>
            <h2 style="color: #121514; margin-top: 0;">Application Received</h2>
            <p>Dear ${record.preferredName || record.fullName},</p>
            <p>Thank you for applying to join the <strong>SportLead Africa Expert Network</strong> in <strong>${record.primaryDiscipline}</strong>.</p>
            
            <div style="background: #EBF5EF; border-left: 4px solid #0D4A2B; padding: 16px; border-radius: 6px; margin: 20px 0;">
              <strong style="color: #0D4A2B;">Next Steps in Onboarding:</strong>
              <p style="margin: 6px 0 0 0; font-size: 14px; color: #2D3748;">
                Our expert network governance committee reviews applications on a rolling cadence. Should your profile and disciplinary credentials align with ongoing or upcoming institutional and infrastructure assignments across Africa, a coordinator will reach out to schedule an introductory interview and conduct reference verification.
              </p>
            </div>

            <p style="font-size: 14px; color: #555;">
              <strong>Application Reference:</strong> ${record.id}<br/>
              <strong>Registered Email:</strong> ${record.email}
            </p>

            <p style="margin-top: 24px;">
              Warm regards,<br/>
              <strong>The Expert Network Committee</strong><br/>
              SportLead Africa
            </p>
          </div>
        </div>
      `,
      type: 'expert_network_receipt',
    });

    return NextResponse.json({
      success: true,
      message: 'Your application has been received. Our review committee evaluates profiles on a rolling basis.',
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
