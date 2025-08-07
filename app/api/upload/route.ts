import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('filename');

    if (!fileName) {
        return new NextResponse('No filename provided', { status: 400 });
    }
    if (!request.body) {
        return new NextResponse('No request.body provided', { status: 400 });
    }

    try {
        const blob = await put(fileName, request.body, {
            access: 'public',
        });

        return NextResponse.json(blob);
    } catch (error) {
        console.error('Error uploading to Vercel Blob:', error);
        return new NextResponse('Error uploading file', { status: 500 });
    }
}
