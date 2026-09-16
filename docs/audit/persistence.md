# Production Architecture Audit: Data Persistence, Upload Handling & Email Delivery

**Audit Date:** 16 September 2026  
**Auditor:** Antigravity (Google DeepMind Advanced Agentic Coding)  
**Target Platform:** Vercel Serverless (Next.js 14 App Router)  
**Status:** **CRITICAL DEFECT IDENTIFIED — PRODUCTION BLOCKER**

---

## 1. Executive Summary & Diagnosis Confirmation

### The Diagnosis is Confirmed
The review build deployed on Vercel suffers from a critical data-loss vulnerability across all form submission and file upload workflows:
1. **Ephemeral Serverless Filesystem:** Vercel Serverless Functions run inside stateless micro-containers with read-only root filesystems. Any write attempt to `process.cwd()/data` throws an `EROFS: read-only file system` error.
2. **Silent Failure & Complete Data Discard:** To circumvent the EROFS crash, recent commits replaced local file-system writes with in-memory UUID records and comments acknowledging serverless constraints (see `src/app/api/inquiries/route.ts` line 7 and `src/app/api/expert-application/route.ts` line 14). However, no database or object store was connected in its place.
3. **Uploaded Files Discarded in Memory:** File uploads (CVs, photographs, certificates, facility briefs) are accepted as `multipart/form-data`, read into Node.js buffer memory for the duration of the lambda execution, and **instantly destroyed when the lambda terminates**.
4. **Email Delivery is Not Active in Production:** Because SMTP credentials (`SMTP_USER`, `SMTP_PASS`) are stored only in an uncommitted `.env.local` file and not configured in Vercel project environment variables, `sendEmail()` prints a `console.warn` into ephemeral logs and returns `{ success: true, mode: 'logged' }`.
5. **Silent User Experience:** The API routes return HTTP 200 `{ success: true }`. The browser UI transitions to a reassuring success state with a reference ID. **The user believes their inquiry or application was submitted, but zero bytes are stored, zero files are saved, and zero email notifications reach the organisation.**

---

## 2. Production vs. Local Development Comparison

| Feature / Step | Local Development (`localhost:3000`) | Production Deployment (Vercel) | Outcome in Production |
| :--- | :--- | :--- | :--- |
| **Record Storage** | Previously wrote to `data/*.json`. Currently creates in-memory object. | In-memory object only; never written to any database. | **Total data loss upon lambda termination.** |
| **File Uploads (CV, Photos, Certs)** | Accepted in memory; historically stored to `data/uploads/`. | Read into ephemeral lambda buffer; discarded on finish. | **Total file loss; documents vanish.** |
| **Email Delivery** | Reads `SMTP_USER` & `SMTP_PASS` from `.env.local` and dispatches via Gmail SMTP. | `SMTP_USER` & `SMTP_PASS` undefined in Vercel environment. | **No emails sent; logged to console only.** |
| **Client Error Feedback** | N/A | Returns HTTP 200 `{ success: true, message: ... }`. | **Fails SILENTLY. False sense of delivery.** |
| **Audit Log** | `data/email-outbox.log` on local disk. | Not written (read-only filesystem). | **No persistent audit trail exists.** |

---

## 3. Audit of Existing Data in `data/`

### Is `data/` Gitignored?
**NO.** `data/` is **not** in `.gitignore`. The entire folder and its sample files are committed directly to the git repository on the branch.

### Does `data/` Contain Real Submissions That Would Be Lost?
Yes. Inspection of `data/` reveals 5 records and 3 uploaded binary documents:
1. **`data/contacts.json` (2 records):**
   - Record 1: *Water Brooks* (`waterbrooksile@gmail.com`, Nigeria, Tel: `+2348129744447`, Date: `2026-09-11T11:04:36.987Z`)
   - Record 2: *Dr. Kwame Mensah* (`kwame@ghanafa.org`, General Secretary, Ghana Football Association, Date: `2026-09-04T14:28:44.365Z`)
2. **`data/project-inquiries.json` (2 records):**
   - Record 1: *Jane Doe* (`jane@example.org`, Director, National Association, Abuja, Date: `2026-09-11T10:45:08.680Z`)
   - Record 2: *Engr. Babatunde Raji* (`babatunde.raji@lagosstate.gov.ng`, Special Advisor, Lagos State Sports Commission, Date: `2026-09-04T14:28:44.611Z`)
3. **`data/expert-applications.json` (1 full record with file references):**
   - *Dr. Emmanuel K. Mensah* (`emmanuel.mensah@example.com`, Principal Sport Facility Architect, Mensah & Partners Advisory, Ghana, Date: `2026-09-11T11:14:21.665Z`)
4. **`data/uploads/` (3 committed binary files):**
   - `data/uploads/cv/505290d8-9a6d-4a2a-bf7b-79bce582359c-Emmanuel_Mensah_CV.pdf`
   - `data/uploads/photo/891cd70b-bc1c-4017-adbd-3adf5c95fba0-emmanuel_photo.jpg`
   - `data/uploads/certificates/4aa5e688-792b-444a-8d35-a40a53711cb8-GIA_Licence_2026.pdf`
5. **`data/email-outbox.log` (425 lines):**
   - Historical logs of simulated notifications and client receipts generated during early development.

---

## 4. Email Notification Reality Check

> [!CAUTION]
> **Real email notifications are NOT being sent from the review build.**  
> When a form is submitted on the live site, neither `inquiries@sportleadafrica.com` nor the admin recipient (`peteradewaletomiwa@gmail.com`) receives an email notification.  
> Furthermore, `data/email-outbox.log` is no longer even appended to because file writes were removed from route handlers to prevent Vercel crashes.  
> **The organisation is completely blind to inbound enquiries on the current deployment.**

---

## 5. Concrete Persistence Options

| Metric / Requirement | Option 1: Email-First Delivery with Direct File Attachments (Immediate) | Option 2: Hosted PostgreSQL (Neon / Supabase) + Cloudflare R2 / Vercel Blob | Option 3: Persistent Disk Container (Railway / Render / VPS) |
| :--- | :--- | :--- | :--- |
| **Description** | Configure verified transactional SMTP/Resend on Vercel. Stream uploaded files (CV, certs, briefs) as MIME attachments directly into `inquiries@sportleadafrica.com`. | Provision serverless Postgres database (Drizzle/Prisma) for structured records. Stream uploads to Cloudflare R2 or Vercel Blob, saving URLs in DB. | Switch deployment from Vercel Serverless to a persistent Docker container host (Railway/Render) with a mounted persistent volume at `/data`. |
| **Setup Effort** | **Very Low (2–3 hours)**<br/>Add environment variables to Vercel, attach file buffers in `src/lib/email.ts`. | **Moderate (1–2 days)**<br/>Create DB schema, migration script, seed existing JSON, integrate S3/R2 upload SDK, set up admin queries. | **Moderate (1 day)**<br/>Create Dockerfile, configure buildpack on Railway/Render, mount persistent volume, configure domain & SSL. |
| **Monthly Cost** | **$0 / month**<br/>(Resend free tier: 3,000 emails/mo, or Google Workspace SMTP included with domain). | **$0 / month**<br/>(Neon free tier: 0.5GB Postgres; Cloudflare R2: 10GB free storage with $0 egress fees). | **$5 – $10 / month**<br/>(Railway/Render base container + persistent disk volume pricing). |
| **Handles File Uploads?** | **Yes.** Files attached directly to admin email (up to 10MB per file; well within 25MB SMTP limits). | **Yes.** Stored securely in Cloudflare R2 / S3 with signed or public download URLs. | **Yes.** Saved to mounted persistent volume disk using existing `storage.ts`. |
| **What Happens to Local JSON Data?** | Existing JSON files can be archived or sent via a one-off import script to the inbox. | Seeded directly into Postgres tables via a simple migration script (`scripts/seed-data.ts`). | Copied directly onto the persistent volume during deployment. |
| **Operational Tradeoffs** | No queryable web dashboard; submissions live in email inbox. If SMTP fails, submission fails (unless fallback queue added). | Requires maintaining database schema and external cloud storage bucket. High reliability and professional architecture. | Forfeits Vercel's global edge network, automated preview branches, and serverless scaling. Requires volume backup management. |

---

## 6. Recommendation

**Implement Option 1 immediately as the pre-launch blocker fix, followed by Option 2 post-launch.**

### Justification
1. **Immediate Zero-Data-Loss Protection:** Option 1 immediately eliminates the production blocker within hours by ensuring every single lead, mandate brief, partner inquiry, and expert application—including attached CVs, certificates, and facility documents—is reliably delivered to `inquiries@sportleadafrica.com` with real file attachments and zero data loss.
2. **Zero Overhead & Zero Cost:** It requires zero database infrastructure or third-party storage accounts before launch, functioning entirely on verified transactional SMTP (Resend or Google Workspace) already planned for the domain.
3. **Clean Migration Path:** Once the site is live and capturing leads safely, Option 2 (Supabase/Neon + Cloudflare R2) can be introduced as a secondary persistence and back-office review dashboard without disturbing live lead delivery.

---

## 7. Next Action Required
Awaiting decision from user before implementing either:
- **Approach A:** Configure Transactional SMTP + Multi-part MIME file attachments in `src/lib/email.ts` and API routes (Option 1).
- **Approach B:** Provision and wire Hosted Database + Object Store (Option 2).
- **Approach C:** Containerize with Persistent Volume mount (Option 3).
