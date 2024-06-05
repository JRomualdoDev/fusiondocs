'use server'

import { promises as fs } from 'fs';
import path from "path";

interface FolderState {
    oldNameFolder?: string;
    newNameFolder?: string;
}
export async function renameFolder(folderConfig: FolderState) {

    let message = '';

    const folderPath = path.join(process.cwd(), `src/app/bd/${folderConfig.oldNameFolder}`);
    const newFolderPath = path.join(process.cwd(), `src/app/bd/${folderConfig.newNameFolder}`);
    // Muda o arquivo index para que o menu mude tbm , label e link
    const indexFilePath = path.join(folderPath, 'index.json');

    try {
        // Renomea o arquivo index
        const data = await fs.readFile(indexFilePath, 'utf8');
        let parsedData = JSON.parse(data);
        // Modifica o label e o link
        parsedData.label = folderConfig.newNameFolder;
        parsedData.link = `/${folderConfig.newNameFolder}`
        // Escreve o arquivo index
        await fs.writeFile(indexFilePath, JSON.stringify(parsedData));

        // Renome todos os links do arquivos da pasta principal
        const files: string[] = await fs.readdir(folderPath);
        for (const file of files) {
            if (file !== 'index.json') {
                let data = await fs.readFile(folderPath + '/' + file, 'utf8');
                let parsedData = JSON.parse(data);
                parsedData.link = `/http/show/${folderConfig.newNameFolder}/${parsedData.label}`;
                await fs.writeFile(folderPath + '/' + file, JSON.stringify(parsedData));
            }
        }

        // Renomea pasta
        await fs.rename(folderPath, newFolderPath);

        message = 'Pasta renomeada com sucesso!';
    }
    catch (error) {
        message = 'Erro ao renomear pasta!';
    }
    return message;
}

export async function renameFile(folder: string, newNameFolder: string) {

    let message = '';

    const folderPath = path.join(process.cwd(), `src/app/bd/${folder}`);
}
