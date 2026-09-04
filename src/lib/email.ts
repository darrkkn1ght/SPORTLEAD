import nodemailer from 'nodemailer';
import { logEmailOutbox } from './storage';
import { SITE_NAME, SITE_EMAIL, HEADQUARTERS } from './constants';

// Configure transporter if environment variables are provided
const transporter = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  type: string;
}

export async function sendEmail({ to, subject, html, text, type }: EmailOptions): Promise<{ success: boolean; mode: 'smtp' | 'logged' }> {
  // Always log to local outbox for audit and offline dev verification
  await logEmailOutbox({ to, subject, html, text, type });

  if (transporter && process.env.SMTP_USER) {
    try {
      await transporter.sendMail({
        from: `"${SITE_NAME}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to,
        subject,
        text: text || html.replace(/<[^>]*>?/gm, ''),
        html,
      });
      console.log(`[Email Sent via SMTP] To: ${to} | Subject: ${subject}`);
      return { success: true, mode: 'smtp' };
    } catch (err) {
      console.error(`[Email SMTP Error] Failed to send to ${to}:`, err);
      // Fall back to logged mode without failing the user submission
      return { success: true, mode: 'logged' };
    }
  }

  console.log(`[Email Logged to data/email-outbox.log] To: ${to} | Subject: ${subject}`);
  return { success: true, mode: 'logged' };
}

// Branded HTML Templates

export function generateProjectInquiryAdminEmail(data: any): { subject: string; html: string } {
  const subject = `[New Mandate Brief] ${data.organisation} — ${data.serviceRequired}`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #121514; background: #FAFAF8; margin: 0; padding: 24px; }
        .card { background: #ffffff; border: 1px solid #E5E5DE; border-radius: 16px; max-width: 640px; margin: 0 auto; padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        .header { border-bottom: 2px solid #0D4A2B; padding-bottom: 16px; margin-bottom: 24px; }
        .title { font-size: 22px; font-weight: 800; color: #0D4A2B; margin: 0 0 6px 0; }
        .badge { display: inline-block; background: #EBF5EF; color: #0D4A2B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 10px; rounded-radius: 4px; }
        .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #666; margin: 24px 0 12px 0; border-bottom: 1px solid #EEE; padding-bottom: 6px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
        th { text-align: left; font-size: 12px; color: #777; padding: 8px 0; width: 35%; }
        td { font-size: 14px; color: #121514; font-weight: 500; padding: 8px 0; }
        .desc-box { background: #F4F4F0; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.7; color: #222; }
        .footer { font-size: 12px; color: #888; text-align: center; margin-top: 32px; border-top: 1px solid #E5E5DE; padding-top: 16px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <span class="badge">Inbound Advisory Inquiry</span>
          <h1 class="title">New Project Brief Submission</h1>
          <p style="margin: 0; font-size: 13px; color: #555;">Ref ID: ${data.id || 'N/A'}</p>
        </div>

        <div class="section-title">Client Coordinates</div>
        <table>
          <tr><th>Full Name:</th><td>${data.name}</td></tr>
          <tr><th>Role / Title:</th><td>${data.role}</td></tr>
          <tr><th>Organisation:</th><td>${data.organisation}</td></tr>
          <tr><th>Email Address:</th><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><th>Telephone:</th><td>${data.telephone || 'Not provided'}</td></tr>
          <tr><th>Country / Base:</th><td>${data.country}</td></tr>
        </table>

        <div class="section-title">Project Parameters</div>
        <table>
          <tr><th>Service Required:</th><td><strong style="color: #0D4A2B;">${data.serviceRequired}</strong></td></tr>
          <tr><th>Organisation Type:</th><td>${data.organisationType}</td></tr>
          <tr><th>Project Location:</th><td>${data.projectLocation}</td></tr>
          <tr><th>Estimated Timeline:</th><td>${data.timeline || 'Flexible / Scoping phase'}</td></tr>
          <tr><th>Budget Envelope:</th><td>${data.budget || 'Undisclosed'}</td></tr>
          <tr><th>Current Stage:</th><td>${data.projectStage || 'Inception / Discovery'}</td></tr>
        </table>

        <div class="section-title">Project Brief & Description</div>
        <div class="desc-box">
          ${data.description.replace(/\n/g, '<br/>')}
        </div>

        ${data.desiredOutcome ? `
          <div class="section-title">Desired Outcomes</div>
          <p style="font-size: 14px; margin: 0;">${data.desiredOutcome}</p>
        ` : ''}

        <div class="footer">
          SportLead Africa Advisory Management System • Lagos, Nigeria
        </div>
      </div>
    </body>
    </html>
  `;
  return { subject, html };
}

export function generateProjectInquiryClientReceipt(data: any): { subject: string; html: string } {
  const subject = `Inquiry Acknowledgment: SportLead Africa [Ref #${(data.id || '').slice(0, 8)}]`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #121514; background: #FAFAF8; margin: 0; padding: 24px; }
        .card { background: #ffffff; border: 1px solid #E5E5DE; border-radius: 16px; max-width: 600px; margin: 0 auto; padding: 36px; }
        .brand { font-size: 20px; font-weight: 800; color: #0D4A2B; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 24px; }
        h2 { font-size: 22px; color: #121514; margin: 0 0 16px 0; }
        p { font-size: 15px; color: #444; line-height: 1.7; margin-bottom: 16px; }
        .highlight-box { background: #EBF5EF; border-left: 4px solid #0D4A2B; padding: 16px 20px; border-radius: 6px; margin: 24px 0; }
        .footer { font-size: 12px; color: #888; border-top: 1px solid #EEE; padding-top: 20px; margin-top: 32px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="brand">SportLead Africa</div>
        <h2>Thank You for Reaching Out</h2>
        <p>Dear ${data.name},</p>
        <p>We have successfully received your project inquiry regarding <strong>${data.serviceRequired}</strong> for <strong>${data.organisation}</strong>.</p>
        
        <div class="highlight-box">
          <strong style="color: #0D4A2B; display: block; margin-bottom: 4px;">What Happens Next:</strong>
          <span style="font-size: 14px; color: #2D3748;">Our senior practice leadership conducts technical reviews within <strong>48 hours</strong>. A practice specialist will follow up directly to discuss scoping requirements or schedule an introductory advisory session.</span>
        </div>

        <p>If you have urgent documents or technical briefs to append, you may reply directly to this message or write to <a href="mailto:${SITE_EMAIL}" style="color: #0D4A2B; font-weight: 600;">${SITE_EMAIL}</a>.</p>

        <p>Warm regards,<br/><strong>The Senior Advisory Practice</strong><br/>SportLead Africa</p>

        <div class="footer">
          SportLead Africa • Building Better Sport Systems Across Africa<br/>
          Headquarters: ${HEADQUARTERS} • <a href="https://sportleadafrica.com" style="color: #666;">sportleadafrica.com</a>
        </div>
      </div>
    </body>
    </html>
  `;
  return { subject, html };
}

export function generateContactAdminEmail(data: any): { subject: string; html: string } {
  const subject = `[Contact Inquiry: ${data.inquiryType}] ${data.subject} — ${data.name}`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #121514; background: #FAFAF8; padding: 24px; }
        .card { background: #fff; border: 1px solid #E5E5DE; border-radius: 14px; max-width: 600px; margin: 0 auto; padding: 32px; }
        h2 { font-size: 20px; color: #0D4A2B; margin-top: 0; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th { text-align: left; font-size: 12px; color: #666; padding: 6px 0; width: 30%; }
        td { font-size: 14px; padding: 6px 0; font-weight: 500; }
        .message-box { background: #F4F4F0; padding: 16px; border-radius: 8px; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="card">
        <h2>New General Inquiry</h2>
        <table>
          <tr><th>From:</th><td>${data.name}</td></tr>
          <tr><th>Email:</th><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><th>Organisation:</th><td>${data.organisation || 'N/A'}</td></tr>
          <tr><th>Inquiry Type:</th><td><strong>${data.inquiryType}</strong></td></tr>
          <tr><th>Subject:</th><td>${data.subject}</td></tr>
          <tr><th>Preferred Contact:</th><td>${data.preferredContact}</td></tr>
        </table>
        <div style="font-weight: 700; font-size: 12px; text-transform: uppercase; color: #666; margin-bottom: 6px;">Message</div>
        <div class="message-box">${data.message.replace(/\n/g, '<br/>')}</div>
      </div>
    </body>
    </html>
  `;
  return { subject, html };
}
