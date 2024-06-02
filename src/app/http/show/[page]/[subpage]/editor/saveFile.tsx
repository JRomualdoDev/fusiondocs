'use server'

import { loadMenu } from '@/app/components/sidebar/loadMenu';
import fs from 'fs';

interface page {
    page: string;
    subpage: string;
}

export async function saveFile(file: string, page: page) {

    console.log(file);
    console.log(page)
    // Mensagem de retorno
    let message = '';
    // File Path
    const filepath = process.cwd() + `/src/app/bd/${page.page}/${page.page}.json`;

    const menu = await loadMenu();
    console.log(menu)
    menu.forEach((menuItem: any) => {
        console.log(page)
        console.log(menuItem)
        console.log(menuItem.subMenu)

        // Menu correto para add content
        if (menuItem.label === page.page) {
            console.log(menuItem)
            menuItem.subMenu.forEach((subMenuItem: any) => {
                console.log(subMenuItem)

                // Menuitem igual nome da subPage
                if (subMenuItem.label === page.subpage) {
                    menuItem.content = file;
                    console.log(menuItem.content)
                    let json = JSON.stringify(menuItem);

                    console.log(json);
                    // Escreve o conteúdo no arquivo
                    fs.writeFileSync(filepath, json);

                }
            })
        }
    })


    return message;
}