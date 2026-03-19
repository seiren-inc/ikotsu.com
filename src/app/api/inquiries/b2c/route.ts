import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, inquiry_type, message } = body;

    // 最低限のバリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, or message' },
        { status: 400 }
      );
    }

    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
    const userAgent = req.headers.get('user-agent') || '';

    // Prisma: transactionで crm.inquiries と ikotsu.inquiry_details を同時に保存
    const crmData = await prisma.$transaction(async (tx) => {
      const inquiry = await tx.crmInquiry.create({
        data: {
          inquiry_channel: 'b2c',
          inquiry_type: inquiry_type || null,
          status: 'new',
          first_name: name,
          email: email,
          phone: phone || null,
          content: message,
          ip_address: ipAddress,
          user_agent: userAgent,
          raw_payload: body,
        },
      });

      await tx.ikotsuInquiryDetail.create({
        data: {
          inquiry_id: inquiry.id,
          inquiry_segment: 'b2c',
          related_simulation_id: null,
          related_diagnosis_id: null,
        },
      });

      return inquiry;
    });

    return NextResponse.json({ success: true, id: crmData.id }, { status: 201 });
  } catch (err) {
    console.error('B2C API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
