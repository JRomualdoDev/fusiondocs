'use client'

import dynamic from "next/dynamic";
import data from "../../../bd/banco.json";

import "./css/style.css";


const Editor = dynamic(() => import("./editor/editor"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});


function show({ params }: { params: { pages: string } }) {
    let page;
    page = data.pages.find((page: any) => {
        return page.name === params.pages
    });
console.log(page)
    // Nova página
    if(!page) {
        console.log("Nova pagina")
       page = {
            name: params.pages,
            content: {
                time: Date.now(),
                blocks: [],
                version: "2.29.1"
            },
        }
    }

console.log(page)
console.log(params.pages)

    return (
        <>
            <div className=" w-[768px] pt-10">
                <Editor page={page?.name}/>              
            </div>
        </>
    )
}

export default show;