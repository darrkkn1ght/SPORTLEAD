import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ success: true }); // Fake success for bots
    }
    
    const { name, email, organisation, description, privacyConsent } = body;
    
    // Basic validation
    if (!name || !email || !organisation || !description || !privacyConsent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // In a real app, save to db and send email here
    console.log('Project inquiry submission:', body);
    
    return NextResponse.json({ success: true, message: 'Inquiry received' });
  } catch (error) {
    console.error('Project inquiry API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
