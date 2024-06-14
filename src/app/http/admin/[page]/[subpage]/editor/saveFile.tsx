'use server'

import { loadMenu } from '@/app/components/sidebar/loadMenu';
import fs from 'fs';

interface page {
    page: string;
    subpage: string;
}

export async function saveFile(file: any, page: page) {
    // Mensagem de retorno
    let message = '';

    // File Path
    const filepath = process.cwd() + `/src/app/bd/${page.page}/${page.subpage}.json`;

    // Le o conteúdo do arquivo para comparar caso igual não salvar
    let contentFileSave = JSON.parse(await fs.readFileSync(filepath, 'utf8'));
    contentFileSave = contentFileSave.content.blocks;

    console.log(JSON.stringify(contentFileSave) === JSON.stringify(file.blocks));
    console.log(JSON.stringify(file.blocks));

    // Caso o resultado em string for o mesmo não grave no arquivo
    if (JSON.stringify(contentFileSave) !== JSON.stringify(file.blocks)) {
        const menu = await loadMenu();
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
        message = 'Arquivo salvo com sucesso!';
    } else {
        message = 'Sem dados para salvar!';
    }

    return message;
}