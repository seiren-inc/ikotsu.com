import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { document_id, session_id } = body;

    if (!document_id) {
      return NextResponse.json({ error: 'Missing document_id' }, { status: 400 });
    }

    // クライアント側（ブラウザ）の User-Agent を取得
    const user_agent = request.headers.get('user-agent') || 'unknown';

    // Prisma: document_downloads にダウンロード記録を保存
    await prisma.ikotsuDocumentDownload.create({
      data: {
        document_id,
        session_id: session_id || crypto.randomUUID(),
        user_agent,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log document download:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
