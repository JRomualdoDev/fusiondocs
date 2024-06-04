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
    const filepath = process.cwd() + `/src/app/bd/${page.page}/${page.subpage}.json`;

    const menu = await loadMenu();
    console.log(menu)
    menu.forEach((menuItem: any) => {
        // Menu correto para add content
        if (menuItem.label === page.page) {
            menuItem.subMenu.forEach((subMenuItem: any) => {
                // Menuitem igual nome da subPage
                if (subMenuItem.label === page.subpage) {
                    // Add item submenu
                    subMenuItem.content = file;
                    let json = JSON.stringify(subMenuItem);
                    // Escreve o conteúdo no arquivo
                    fs.writeFileSync(filepath, json);
                }
            })
        }
    });

    return message;
}