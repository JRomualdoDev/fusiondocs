'use server'

import fs from 'fs';
import path from 'path';
import { loadMenu } from './loadMenu';

export async function createSubMenu(item: string, subItem: string = '', action: string) {

    let modifiedData;
    let message = '';

    // Defina o caminho para a nova pasta e arquivo
    const folderPath = path.join(process.cwd(), 'src/app/bd', item);
    const filePath = path.join(folderPath, `${item}.json`);

    // Pega do load as informaçoes do menu
    const menu = await loadMenu();

    menu.forEach((menuItem: any) => {
        if (menuItem.label === item) {
            console.log(menuItem)
            console.log(subItem)

            // Existe algum subMenu
            if (menuItem.subMenu.length > 0) {
                const exists = menuItem.subMenu.some((subMenuItem: any) => subMenuItem.label === subItem);
                // Menu não existe? crie
                if (!exists) {
                    menuItem.subMenu.unshift({
                        label: subItem,
                        link: `/http/show/${item}/${subItem}`,
                        content: [],
                    });
                    message = "SubMenu Criado com sucesso.";
                }
                else {
                    message = "SubMenu ja existe.";
                }
            }
            else {
                menuItem.subMenu.unshift({
                    label: subItem,
                    link: `/http/show/${item}/${subItem}`,
                    content: [],
                });
                console.log("aa")
                message = "SubMenu Criado com sucesso.";
            }

            let json = JSON.stringify(menuItem);
            // Escreve o conteúdo no arquivo
            fs.writeFileSync(filePath, json);
        }
    })
    return message;
}

