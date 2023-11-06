import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';

interface contextProps {
    params: {
        postId: string
    }
}
export async function PATCH(req: Request, context: contextProps) {
    const { params } = context;
    const body = await req.json();

    try {

        const updatedPost = await db.post.update({
            where: {
                id: params.postId
            },
            data: {
                title: body.title,
                content: body.content,
                imageUrl: body.imageUrl
            }
        })
        return NextResponse.json({ message: 'Successfully updated', updatedPost }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Could not update post' }, { status: 500 });
    }
}
export async function DELETE(req: Request, context: contextProps) {
    const { params } = context;
    try {
        await db.post.delete({
            where: {
                id: params.postId
            }
        })
        return new Response(null, { status: 204 })

    } catch (error) {
        return NextResponse.json({ message: 'Could not delete post' }, { status: 500 });
    }
}
export async function GET(req: Request, context: contextProps) {
    const { params } = context;
    try {
        const post = await db.post.findUnique({
            where: {
                id: params.postId
            },
            include: {
                tags: true
            }
        })
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'could not get tags' }, { status: 500 });

    }
}