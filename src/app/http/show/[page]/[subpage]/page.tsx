'use client'

import dynamic from "next/dynamic";

import "./css/style.css";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"



const Editor = dynamic(() => import("./editor/editor"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

interface pages {
    page: object
}

function show({ params }: { params: { pages: pages } }) {
    let pages = params;

    return (
        <>
            <div className="w-full p-3 border border-l-0">
                <Breadcrumb className="ps-4">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            {pages.page}
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {pages.subpage}
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className=" w-[768px] pt-10">
                <Editor page={pages} />
            </div>
        </>
    )
}

export default show;