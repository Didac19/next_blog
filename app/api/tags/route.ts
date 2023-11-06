import { NextResponse } from 'next/server';
import { db } from '../../lib/db';


export async function GET() {
    try {
        const tags = await db.tag.findMany(
            { select: { id: true, name: true } }
        );
        return NextResponse.json(tags, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: 'could not get tags', error: error.message }, { status: 500 });
    }
}