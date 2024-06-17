import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    return NextResponse.json(
        {
            "ae2": "/http/admin"
        }
    )
}