

import { loadMenu } from "@/app/components/sidebar/loadMenu";
import Index from "./pageIndex";



type Params = {
    page: string;
}

//Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams(): Promise<Params[]> {
    const menu = await loadMenu();

    if (!menu || menu.length == 0) {
        return [{ page: 'not-found' }]
    }

    return menu.map((menu: any) => ({ page: menu.label }))
}

export const dynamicParams = true;

export default async function Page({ params }: { params: { page: string } }) {


    // let pages = params;
    let { page } = params;


    return (
        <Index pages={page} />
    )
}
