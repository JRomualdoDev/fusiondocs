'use client'

import dynamic from "next/dynamic";
import data from "../../../../bd/banco.json";

import "./css/style.css";


const Editor = dynamic(() => import("./editor/editor"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

interface pages {
    page: object
}

function show({ params }: { params: { pages: pages } }) {
    let pages = params;
    console.log(params)
    // page = data.pages.find((page: any) => {
    //     return page.name === params.pages
    // });
    console.log(pages)
    // Nova página
    if (!pages) {
        console.log("Nova pagina")
        // page = {
        //     name: params.pages,
        //     content: {
        //         time: Date.now(),
        //         blocks: [],
        //         version: "2.29.1"
        //     },
        // }
    }

    console.log(pages)
    console.log(params.pages)

    return (
        <>
            <div className=" w-[768px] pt-10">
                {/* <Editor page={page?.name} /> */}
                <Editor page={pages} />
            </div>
        </>
    )
}

export default show;