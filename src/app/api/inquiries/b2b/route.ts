import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      inquiry_type,
      corporate_name,
      contact_person,
      position,
      phone,
      email,
      monthly_volume,
      corporate_type,
      requested_model,
      message,
    } = body;

    // 最低限のバリデーション
    if (!corporate_name || !contact_person || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: corporate_name, contact_person, or email' },
        { status: 400 }
      );
    }
    
    // ご相談・見積りの場合はメッセージ必須
    if (inquiry_type === 'consultation' && !message) {
      return NextResponse.json(
        { error: 'Message is required for consultation' },
        { status: 400 }
      );
    }

    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
    const userAgent = req.headers.get('user-agent') || '';
    
    // 資料請求の場合は先頭に識別用テキストを付ける（フロントでやっていた処理をAPI側に寄せる）
    const prefix = inquiry_type === 'document' ? '【資料請求】\n' : '';
    const finalContent = prefix + (message ? message.trim() : '');

    // Prisma: transactionで crm.inquiries と ikotsu.inquiry_details を同時に保存
    const crmData = await prisma.$transaction(async (tx) => {
      const inquiry = await tx.crmInquiry.create({
        data: {
          inquiry_channel: 'b2b',
          status: 'new',
          organization_name: corporate_name,
          contact_person: contact_person,
          email: email,
          phone: phone || null,
          content: finalContent,
          ip_address: ipAddress,
          user_agent: userAgent,
          raw_payload: body,
        },
      });

      await tx.ikotsuInquiryDetail.create({
        data: {
          inquiry_id: inquiry.id,
          inquiry_segment: 'b2b',
          corporate_name: corporate_name,
          contact_person: contact_person,
          position: position || null,
          monthly_volume: monthly_volume ? parseInt(monthly_volume, 10) : null,
          corporate_type: corporate_type || null,
          requested_model: requested_model || null,
        },
      });

      return inquiry;
    });

    return NextResponse.json({ success: true, id: crmData.id }, { status: 201 });
  } catch (err) {
    console.error('B2B API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
