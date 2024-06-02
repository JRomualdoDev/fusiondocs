import { loadMenu } from "@/app/components/sidebar/loadMenu";

interface page {
    page: string;
    subpage: string;
}

export async function initData(page: page) {

    let initData = '';

    // Load Dados
    const dataBD = await loadMenu();
    console.log(dataBD)

    dataBD.forEach((data: any) => {
        console.log(data)
        // Pegando o nome da pagina e subpagina
        data.subMenu.forEach((submenu: any) => {
            const url = submenu.link;
            const urlArray = url.split('/').filter((item: string) => item !== "");

            // Procura config da pasta atual 
            // ulrArray[3] = page e urlArray[4] = subpage
            console.log(urlArray[2])
            console.log(urlArray[3])
            console.log(page.page)
            console.log(page.subpage)

            if (urlArray[2] === page.page && urlArray[3] === page.subpage) {
                initData = data.content;
            }
        })
    })
    return initData;
}