

import Index from "./pageIndex";




//Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
    // const pages = await fetch('http://localhost:3000/api/page').then((res) => res.json()).catch((err) => console.log(err))
    // console.log(pages)
    // return pages.map((page: any) => ({
    //     slug: page.pages,
    // }))
}

export default async function Page({ params }: any) {


    // let pages = params;
    let pages = 'admin/ae2';
    console.log(pages)


    return (
        <Index pages={pages} />
    )
}
