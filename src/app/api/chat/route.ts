import { openai } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();
    console.log(messages)
    const result = await streamText({
        model: openai('gpt-4'),
        messages,
    });
    console.log(result)
    return result.toAIStreamResponse();
}



// import { openai } from '@ai-sdk/openai';
// import { StreamingTextResponse, streamText, StreamData } from 'ai';

// Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//     const { messages } = await req.json();
//     console.log(messages)
//     const result = await streamText({
//         model: openai('gpt-4-turbo'),
//         messages,
//     });

//     const data = new StreamData();

//     data.append({ test: 'value' });

//     const stream = result.toAIStream({
//         onFinal(_) {
//             data.close();
//         },
//     });
//     console.log(stream)
//     return new StreamingTextResponse(stream, {}, data);
// }