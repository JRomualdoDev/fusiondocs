import { loadMenu } from "@/app/components/sidebar/loadMenu";
import PageIndex from "./pageIndex";


// interface path {
//     pages: {
//         menu: string,
//         submenu: string
//     }

// }

type Params = {
    page: string;
    subpage: string;
}

export async function generateStaticParams(): Promise<Params[]> {
    const menu = await loadMenu();

    if (!menu || menu.length == 0) {
        return [{ page: 'not-found', subpage: 'not-found' }]
    }

    return menu.map((menu: any) => {
        return menu.subMenu.map((submenu: any) => {
            return { page: menu.label, subpage: submenu.label }
        })
    }).flat();
}


export default async function Page({ params }: { params: { page: string, subpage: string } }) {

    let { page, subpage } = params;

    return (
        <>
            <PageIndex page={page} subpage={subpage} />
        </>
    )
}
