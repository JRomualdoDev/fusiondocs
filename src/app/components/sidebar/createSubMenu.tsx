'use server'

import fs from 'fs';
import path from 'path';
import { loadMenu } from './loadMenu';

export async function createSubMenu(item: string, subItem: string = '', action: string) {

    let modifiedData;

    console.log(item)
    console.log(subItem)
    // Defina o caminho para a nova pasta e arquivo
    const folderPath = path.join(process.cwd(), 'src/app/bd', item);
    const filePath = path.join(folderPath, `${item}.json`);

    // Pega do load as informaçoes do menu
    const menu = await loadMenu();

    menu.forEach((menuItem: any) => {
        console.log(menuItem)
        if (menuItem.label === item) {

            console.log(item)
            console.log(subItem)
            menuItem.subMenu.unshift({
                label: subItem,
                link: `/http/show/${item}/${subItem}`,
            });

            let json = JSON.stringify(menuItem);
            // Escreve o conteúdo no arquivo
            fs.writeFileSync(filePath, json);
        }
    })
    return 'SubMenu Criado com sucesso.';
}

