import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../lib/db';


export async function POST(req: Request, res: Response) {
    const body = await req.json();
    console.log(body);

    try {
        const post = await db.post.create({
            data: {
                title: body.title,
                content: body.content,
                tagId: body.tagId,
                imageUrl: body.imageUrl
            }
        })
        return NextResponse.json({ message: 'POST request' }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Could not create post' }, { status: 500 });
    }
}
