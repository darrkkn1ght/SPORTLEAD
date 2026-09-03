import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ success: true }); // Fake success for bots
    }
    
    const { name, email, message, privacyConsent } = body;
    
    // Basic validation
    if (!name || !email || !message || !privacyConsent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // In a real app, send email here
    console.log('Contact form submission:', body);
    
    return NextResponse.json({ success: true, message: 'Message received' });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
