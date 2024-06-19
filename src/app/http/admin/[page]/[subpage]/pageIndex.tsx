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

export default function PageIndex({ page, subpage }: any) {
    // let { pages } = params;

    let pages = { page, subpage };

    return (
        <>
            <div className="inline-flex w-full p-3 border border-l-0 items-center">
                <Breadcrumb className="ps-4 w-full">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/http/show/${page}`} >{page}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/http/show/${page}/${subpage}`} >{subpage}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

            </div>
            <div className=" w-full pt-8">
                <Editor page={pages} />
            </div>
        </>
    )

}