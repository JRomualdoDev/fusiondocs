'use server'

import { promises as fs } from 'fs';
import path from "path";

interface FolderState {
    oldNameFolder?: string;
    newNameFolder?: string;
}
export async function renameFolder(folderConfig: FolderState) {

    let message = '';

    // Limpa a string do nome da pasta para sempre minuscula e sem acentos
    folderConfig.oldNameFolder = folderConfig.oldNameFolder?.normalize("NFD").replace(/[^a-zA-Z\s]/g, "");
    folderConfig.newNameFolder = folderConfig.newNameFolder?.normalize("NFD").replace(/[^a-zA-Z\s]/g, "");
    // Sem espaços
    folderConfig.oldNameFolder = folderConfig.oldNameFolder?.replace(/\s+/g, '');
    folderConfig.newNameFolder = folderConfig.newNameFolder?.replace(/\s+/g, '');

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
        parsedData.link = `/http/admin/${folderConfig.newNameFolder}`
        // Escreve o arquivo index
        await fs.writeFile(indexFilePath, JSON.stringify(parsedData));

        // Renome todos os links do arquivos da pasta principal
        const files: string[] = await fs.readdir(folderPath);
        for (const file of files) {
            if (file !== 'index.json') {
                let data = await fs.readFile(folderPath + '/' + file, 'utf8');
                let parsedData = JSON.parse(data);
                parsedData.link = `/http/admin/${folderConfig.newNameFolder}/${parsedData.label}`;
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

interface FileState {
    oldNameFile?: string;
    newNameFile?: string;
}

export async function renameFile(fileConfig: FileState, nameFolder: string) {
    console.log(fileConfig)
    console.log(nameFolder)
    let message = '';

    // Limpa a string do nome da pasta para sempre minuscula e sem acentos
    fileConfig.oldNameFile = fileConfig.oldNameFile?.normalize("NFD").replace(/[^a-zA-Z\s]/g, "");
    fileConfig.newNameFile = fileConfig.newNameFile?.normalize("NFD").replace(/[^a-zA-Z\s]/g, "");
    nameFolder = nameFolder?.normalize("NFD").replace(/[^a-zA-Z\s]/g, "");
    // Sem espaços
    fileConfig.oldNameFile = fileConfig.oldNameFile?.replace(/\s+/g, '');
    fileConfig.newNameFile = fileConfig.newNameFile?.replace(/\s+/g, '');
    nameFolder = nameFolder?.replace(/\s+/g, '');


    const folderPath = path.join(process.cwd(), `src/app/bd/${nameFolder}`);
    // Muda o arquivo index para que o menu mude tbm , label e link
    const indexFilePath = path.join(folderPath, `${fileConfig.oldNameFile}.json`);
    const indexNewFilePath = path.join(folderPath, `${fileConfig.newNameFile}.json`);

    try {
        // Renomea o arquivo
        await fs.rename(indexFilePath, indexNewFilePath);

        // Renomea o arquivo index
        const data = await fs.readFile(indexNewFilePath, 'utf8');
        let parsedData = JSON.parse(data);
        // Modifica o label e o link
        parsedData.label = fileConfig.newNameFile;
        parsedData.link = `/http/admin/${nameFolder}/${fileConfig.newNameFile}`
        // Escreve o arquivo index
        await fs.writeFile(indexNewFilePath, JSON.stringify(parsedData));

        // // Renome todos os links do arquivos da pasta principal
        // const files: string[] = await fs.readdir(folderPath);
        // for (const file of files) {
        //     if (file !== 'index.json') {
        //         let data = await fs.readFile(folderPath + '/' + file, 'utf8');
        //         let parsedData = JSON.parse(data);
        //         parsedData.link = `/http/admin/${folderConfig.newNameFolder}/${parsedData.label}`;
        //         await fs.writeFile(folderPath + '/' + file, JSON.stringify(parsedData));
        //     }
        // }

        message = 'Arquivo renomeado com sucesso!';
    }
    catch (error) {
        message = 'Erro ao renomear o arquivo!';
    }

    return message;
}
