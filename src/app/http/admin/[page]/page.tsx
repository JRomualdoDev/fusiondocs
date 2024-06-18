

import { loadMenu } from "@/app/components/sidebar/loadMenu";
import Index from "./pageIndex";



//Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
    const menu = await loadMenu();

    return menu.map((menu: any) => ({ page: menu.label }))
}

export default async function Page({ params }: any) {


    // let pages = params;
    let { page } = params;
    console.log(page)


    return (
        <Index pages={page} />
    )
}
