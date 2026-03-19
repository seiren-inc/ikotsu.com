import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      session_id,
      bone_condition,
      future_plan,
      storage_period,
      anxiety_type,
      recommended_service,
    } = body;

    // バリデーション
    if (!session_id || !bone_condition || !future_plan || !recommended_service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
    const userAgent = req.headers.get('user-agent') || '';

    // Prisma: ikotsu.diagnosis_logs へ保存
    await prisma.ikotsuDiagnosisLog.create({
      data: {
        session_id,
        bone_condition,
        future_plan,
        storage_period: storage_period || null,
        anxiety_type: anxiety_type || null,
        recommended_service,
        ip_address: ipAddress,
        user_agent: userAgent,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('Diagnosis API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
