import { loadMenu } from "@/app/components/sidebar/loadMenu";
import PageIndex from "./pageIndex";


interface path {
    params: {
        page: string,
        subpage: string
    }

}

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

function show({ params }: path) {


    return (
        <>
            <PageIndex pages={params} />
        </>
    )
}

export default show;