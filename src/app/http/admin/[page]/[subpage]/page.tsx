import { loadMenu } from "@/app/components/sidebar/loadMenu";
import PageIndex from "./pageIndex";


// interface path {
//     pages: {
//         menu: string,
//         submenu: string
//     }

// }

export async function generateStaticParams() {
    const menu = await loadMenu();
    let pages: any = [];

    let teste = menu.map((menu: any) => {
        return menu.subMenu.map((submenu: any) => {
            return { page: menu.label, subpage: submenu.label }
        })
    }).flat();

    return teste
}

function show({ params }: any) {

    let { page, subpage } = params;

    return (
        <>
            <PageIndex page={page} subpage={subpage} />
        </>
    )
}

export default show;