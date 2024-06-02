'use server'

import { promises as fs } from 'fs';
import path from 'path';

export async function loadMenu() {

    let parsedData: string[] = [];

    // Vai ler o arquivo correspondente ao menu criado no banco
    const bdPath = path.join(process.cwd(), 'src/app/bd');

    // Le a pasta BD
    const files: string[] = await fs.readdir(bdPath);

    // Loop para ler os arquivos dentro das pastas
    for (const folder of files) {
        // Não crie o path caso bd.json(banco de dados do editorjs)
        if (folder !== 'banco.json') {
            const jsonFilePath = path.join(bdPath, folder, `${folder}.json`);
            // Le o arquivo
            try {
                const jsonData = await fs.readFile(jsonFilePath, 'utf8');
                parsedData.push(JSON.parse(jsonData));
                console.log(parsedData)
            }
            catch (error) {
                console.log("Error => ", error)
            }
        }
    }

    return parsedData;
}