
import { ToolConstructable } from '@editorjs/editorjs';

// @ts-ignore
const Header = require('editorjs-header-with-anchor');
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from "@editorjs/list";
import Warning from '@editorjs/warning';
import CodeTool from '@editorjs/code';
import SimpleImage from "@editorjs/simple-image";
import RawTool from '@editorjs/raw';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import Checklist from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
const AlignmentTuneTool = require('editorjs-text-alignment-blocktune');
import Paragraph from '@editorjs/paragraph';
import AIText from '@alkhipce/editorjs-aitext';


export default function Tools(append: any, messages: any) {

    return {
        header: {
            class: Header,
            // shortcut: 'CMD+SHIFT+H',
            tunes: ['tune'],
        },
        paragraph: {
            class: Paragraph,
            inlineToolbar: true,
        },
        linkTool: {
            class: LinkTool,
            config: {
                endpoint: 'http://localhost:3000/api/teste',
                queryParam: 'search'
            }
        },
        table: {
            class: Table,
            inlineToolbar: true,
            config: {
                rows: 2,
                cols: 3,
            },
        },
        list: {
            class: List,
            inlineToolbar: true,
            config: {
                defaultStyle: 'unordered'
            }
        },
        warning: {
            class: Warning,
            inlineToolbar: true,
            // shortcut: 'CMD+SHIFT+W',
            config: {
                titlePlaceholder: 'Title',
                messagePlaceholder: 'Message',
            },
        },
        quote: {
            class: Quote,
            inlineToolbar: true,
            // shortcut: 'CMD+SHIFT+O',
            config: {
                quotePlaceholder: 'Enter a quote',
                captionPlaceholder: 'Quote\'s author',
            },
        },
        Marker: {
            class: Marker,
            // shortcut: 'CMD+SHIFT+M',
        },
        checklist: {
            class: Checklist,
            inlineToolbar: true,
        },
        inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+M',
        },
        tune: {
            class: AlignmentTuneTool,
            config: {
                default: "right",
                blocks: {
                    header: 'center',
                    list: 'right'
                }
            },
        },
        aiText: {
            // if you do not use TypeScript you need to remove "as unknown as ToolConstructable" construction
            // type ToolConstructable imported from @editorjs/editorjs package
            class: AIText as unknown as ToolConstructable,
            config: {
                // here you need to provide your own suggestion provider (e.g., request to your backend)
                // this callback function must accept a string and return a Promise<string>
                callback: (text: any) => {
                    return new Promise(resolve => {
                        console.log(text)
                        // handleInputChange
                        // setInput(text);
                        // handleSubmit;
                        // console.log(teste)

                        append({
                            role: 'user',
                            content: 'Hello, how can I help you?'
                        })

                        setTimeout(() => {
                            resolve(messages)
                            console.log(messages)
                        }, 1000)
                    })
                },
            }
        },
        code: CodeTool,
        image: SimpleImage,
        raw: RawTool,
        delimiter: Delimiter,
    }
}