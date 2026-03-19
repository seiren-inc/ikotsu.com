import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      session_id,
      bone_size,
      bone_condition,
      options,
      estimated_price,
      price_breakdown,
    } = body;

    // バリデーション
    if (!session_id || estimated_price === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
    const userAgent = req.headers.get('user-agent') || '';

    // ikotsu.simulation_logs 専用のペイロード分割
    const inputPayload = {
      bone_size,
      bone_condition,
      options,
    };
    const resultPayload = {
      estimated_price,
      price_breakdown,
    };

    // Prisma: ikotsu.simulation_logs へ保存
    await prisma.ikotsuSimulationLog.create({
      data: {
        session_id,
        simulation_type: 'pricing', // 固定
        input_payload: inputPayload,
        result_payload: resultPayload,
        ip_address: ipAddress,
        user_agent: userAgent,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('Simulation API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
