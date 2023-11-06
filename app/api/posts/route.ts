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
                authorId: "72a78e8e-5098-4ae7-ace1-e7cde9db9d73",
                imageUrl: body.imageUrl,
                tags: {
                    connect: body.tags.map((tagId: string) => ({ id: tagId })),
                },
            },

        })

        return NextResponse.json({ message: 'POST request' }, { status: 200 });

    } catch (error: any) {
        console.log(error);

        return NextResponse.json({ message: 'Could not create post', error: error.message }, { status: 500 });
    }
}
