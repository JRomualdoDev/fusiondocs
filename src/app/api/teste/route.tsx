//app/api/test/route.js

import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    return NextResponse.json(
        {
            "success": 1,
            "meta": {
                "title": "CodeX Team",
                "description": "Club of web-development, design and marketing. We build team learning how to build full-valued projects on the world market.",
                "image": {
                    "url": "https://codex.so/public/app/img/meta_img.png"
                },

            },
            "link": "https://codex.so"
        }
    )
}