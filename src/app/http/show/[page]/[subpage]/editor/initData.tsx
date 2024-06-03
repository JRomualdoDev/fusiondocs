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
            console.log(typeof submenu)

            if (urlArray[2] === page.page && urlArray[3] === page.subpage) {
                for (let [key, value] of Object.entries(submenu)) {
                    console.log(key, value)
                    if (value === page.subpage) {
                        initData = submenu.content;
                    }
                }
            }
        })
    })
    return initData;
}