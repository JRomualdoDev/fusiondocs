'use server'

import { promises as fs } from 'fs';
import path from 'path';

export async function loadMenu() {

    let parsedData = [];
    let menuFull = [];

    // Vai ler o arquivo correspondente ao menu criado no banco
    const bdPath = path.join(process.cwd(), 'src/app/bd');

    // Le a pasta 
    const files: string[] = await fs.readdir(bdPath);

    // Loop para ler os arquivos dentro das pastas
    for (const folder of files) {
        // Le o arquivo index da pasta com as configs
        const fileIndex = await fs.readFile(`${bdPath}/${folder}/index.json`, 'utf8');
        parsedData = JSON.parse(fileIndex);

        // Le a pasta 
        const filesSubFolder: string[] = await fs.readdir(`${bdPath}/${folder}`);
        // Varre as pasta criadas 
        for (const subFolder of filesSubFolder) {
            // Pega cada arquivo dentro da pasta menos index e add a config do menu index
            const file = await fs.readFile(`${bdPath}/${folder}/${subFolder}`, 'utf8');
            let dataFile = JSON.parse(file);

            // Não adiciona se for index
            if (subFolder !== 'index.json') {
                parsedData.subMenu.push(dataFile);
            }
        }
        // Adiciona o menu completo
        menuFull.push(parsedData);
    }
    // Retorna array menu completo
    return menuFull;
}