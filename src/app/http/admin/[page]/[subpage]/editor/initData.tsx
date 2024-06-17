import { loadMenu } from "@/app/components/sidebar/loadMenu";

interface page {
    page: string;
    subpage: string;
}

export async function initData(page: page) {

    let initData = '';

    // Load Dados
    const dataBD = await loadMenu();

    dataBD.forEach((data: any) => {
        // Pegando o nome da pagina e subpagina
        data.subMenu.forEach((submenu: any) => {
            const url = submenu.link;
            const urlArray = url.split('/').filter((item: string) => item !== "");

            // Procura config da pasta atual 
            // ulrArray[3] = page e urlArray[4] = subpage
            if (urlArray[2] === page.page && urlArray[3] === page.subpage) {
                for (let [key, value] of Object.entries(submenu)) {
                    if (value === page.subpage) {
                        initData = submenu.content;
                    }
                }
            }
        })
    })
    return initData;
}