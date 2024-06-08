import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export default function Page({ params }: any) {

    let pages = params;

    return (
        <>
            <div className="w-full p-3 border border-l-0">
                <Breadcrumb className="ps-4">
                    <BreadcrumbList>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {pages.page}
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div>
                <h1>{pages.page}</h1>
            </div>
        </>
    )
}