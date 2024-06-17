

import { loadMenu } from "@/app/components/sidebar/loadMenu";
import Index from "./pageIndex";



//Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
    const menu = await loadMenu();

    // console.log(menu)
    // const pages = await fetch('http://localhost:3000/nextjs-github-pages/http/').then((res) => res.json()).catch((err) => console.log(err))
    // console.log(pages)
    return menu.map((menu: any) => ({
        pages: {
            menu: menu.label,
            submenu: menu.subMenu.label
        },
    }))
}

export default async function Page({ params }: any) {


    // let pages = params;
    let { pages } = params;
    console.log(pages)


    return (
        <Index pages={pages} />
    )
}
