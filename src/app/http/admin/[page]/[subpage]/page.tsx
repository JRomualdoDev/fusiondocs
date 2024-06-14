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

import {
    Circle
} from "lucide-react"

const Editor = dynamic(() => import("./editor/editor"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

interface path {
    params: {
        page: string,
        subpage: string
    }

}

function show({ params }: path) {
    let pages = params;

    return (
        <>
            <div className="inline-flex w-full p-3 border border-l-0 items-center">
                <Breadcrumb className="ps-4 w-full">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/http/show/${pages.page}`} >{pages.page}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/http/show/${pages.page}/${pages.subpage}`} >{pages.subpage}</BreadcrumbLink>
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

export default show;