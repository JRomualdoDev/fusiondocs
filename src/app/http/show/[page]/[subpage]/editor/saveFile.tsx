'use server'

import { loadMenu } from '@/app/components/sidebar/loadMenu';
import fs from 'fs';

interface page {
    page: string;
    subpage: string;
}

export async function saveFile(file: string, page: page) {
    // Mensagem de retorno
    let message = '';
    // File Path
    const filepath = process.cwd() + `/src/app/bd/${page.page}/${page.page}.json`;

    const menu = await loadMenu();

    menu.forEach((menuItem: any) => {
        // Menu correto para add content
        if (menuItem.label === page.page) {
            menuItem.subMenu.forEach((subMenuItem: any) => {

                // Menuitem igual nome da subPage
                if (subMenuItem.label === page.subpage) {
                    // Add item submenu
                    subMenuItem.content = file;
                    // Add menu o submenu modificado
                    menuItem.subMenu = menuItem.subMenu;

                    let json = JSON.stringify(menuItem);
                    // Escreve o conteúdo no arquivo
                    fs.writeFileSync(filepath, json);

                }
            })
        }
    });

    return message;
}