'use server'

import { promises as fs } from 'fs';
import path from 'path';
import { loadMenu } from '../loadMenu';
import { redirect } from 'next/navigation';

export async function createSubMenu(item: string, subItem: string = '', action: string) {

    console.log(item)
    console.log(subItem)

    let message = '';
    let content = '';
    let parsedData: string[] = [];

    // Defina o caminho para a nova pasta e arquivo
    const folderPath = path.join(process.cwd(), `src/app/bd/${item}`);
    const filePath = path.join(`${folderPath}`, `${subItem}.json`);

    // Pega do load as informaçoes do menu
    const menu = await loadMenu();

    // Le a pasta BD
    const files: string[] = await fs.readdir(folderPath);

    // Loop para ler os arquivos dentro das pastas
    for (const folder of files) {
        // Não crie o path caso já exista
        const jsonFilePath = path.join(folderPath, folder);
        // Le o arquivo
        try {
            const files = await fs.readFile(jsonFilePath, 'utf8');
            parsedData.push(JSON.parse(files));
            // Percorre os arquivos e testa se já existe o arquivo         
            const exists = parsedData.some((subMenuItem: any) => subMenuItem.label === subItem);

            // SubMenu não existe? crie
            if (!exists) {
                content = `{
                    "label": "${subItem}",
                    "link": "/http/show/${item}/${subItem}",
                    "content": []
                }`;
                message = "SubMenu Criado com sucesso.";

                // Escreve o conteúdo no arquivo
                await fs.writeFile(filePath, content);
            }
            else {
                message = "SubMenu já existe.";
            }
        } catch (error) {
            console.log("Error => ", error)
        }
    }
    // https://stackoverflow.com/questions/76191324/next-13-4-error-next-redirect-in-api-routes
    // Ocorre um erro ao usar o redirect dentro o try catch
    if (message === 'SubMenu Criado com sucesso.') {
        // Redirect para url criada
        redirect(`/http/show/${item}/${subItem}`);
    }
    return message;
}