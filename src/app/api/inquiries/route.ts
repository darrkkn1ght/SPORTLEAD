import { NextResponse } from 'next/server';
import { getContactSubmissions, getProjectInquiries, getExpertApplications } from '@/lib/storage';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';

    const [contacts, inquiries, experts] = await Promise.all([
      getContactSubmissions(),
      getProjectInquiries(),
      getExpertApplications(),
    ]);

    if (type === 'contacts') {
      return NextResponse.json({ success: true, count: contacts.length, data: contacts });
    }
    if (type === 'inquiries') {
      return NextResponse.json({ success: true, count: inquiries.length, data: inquiries });
    }
    if (type === 'experts') {
      return NextResponse.json({ success: true, count: experts.length, data: experts });
    }

    return NextResponse.json({
      success: true,
      counts: {
        contacts: contacts.length,
        inquiries: inquiries.length,
        experts: experts.length,
      },
      data: {
        contacts,
        inquiries,
        experts,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Error fetching records' },
      { status: 500 }
    );
  }
}
