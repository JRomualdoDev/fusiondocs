'use server'

import fs from 'fs';
import path from 'path';
import { loadMenu } from './loadMenu';

export async function createSubMenu(item: string, subItem: string = '', action: string) {

    let modifiedData;
    console.log(item)
    console.log(subItem)
    console.log(action)

    // Defina o caminho para a nova pasta e arquivo
    const folderPath = path.join(process.cwd(), 'src/app/bd', item);
    const filePath = path.join(folderPath, `${item}.json`);

    // Pega do load as informaçoes do menu
    const menu = await loadMenu();
    console.log(menu)

    menu.forEach((menuItem: any) => {
        console.log(menuItem)
        if (menuItem.label === item) {
            console.log('Item Encontrado')
            menuItem.subMenu.unshift({
                label: subItem,
                link: `/http/show/${item}/${subItem}`,
            });
            console.log(menuItem)
            let json = JSON.stringify(menuItem);
            // Escreve o conteúdo no arquivo
            fs.writeFileSync(filePath, json);
        }
    })
    return 'SubMenu Criado com sucesso.';
}

