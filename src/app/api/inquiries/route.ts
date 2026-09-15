import { NextResponse } from 'next/server';

/**
 * This endpoint previously read submission records from local JSON files
 * (data/contacts.json, data/project-inquiries.json, data/expert-applications.json).
 *
 * Local file storage does not work on serverless platforms (Vercel) because
 * the filesystem is read-only and ephemeral. All submissions are now delivered
 * exclusively via email.
 *
 * To restore a queryable record of submissions, integrate a database
 * (e.g. Vercel Postgres, PlanetScale, Supabase) and update the submission
 * routes to write records there in addition to sending email.
 */
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error:
        'Submission records are delivered via email. ' +
        'A database backend is required to enable this endpoint. ' +
        'See the comment in this route file for guidance.',
    },
    { status: 501 }
  );
}
