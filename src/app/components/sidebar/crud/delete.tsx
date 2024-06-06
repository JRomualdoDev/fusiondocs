'use server'

import fs from 'fs';
import path from "path";

export async function delFolder(folder: string) {
    console.log('Excluindo pasta:', folder);

    let message = '';

    const folderPath = path.join(process.cwd(), `src/app/bd/${folder}`);

    // Exclui Folder
    try {
        fs.rmdir(folderPath, { recursive: true }, (err) => { })

        message = 'Pasta excluída com sucesso!';
    } catch (error) {
        console.log(error)
        message = 'Erro ao excluir pasta!';
    }

    return message;
}

export async function delFile(folder: string, file: string) {
    console.log(folder);
    console.log(file);

    let message = '';

    const filePath = path.join(process.cwd(), `src/app/bd/${folder}/${file}.json`);

    // Exclui File
    try {
        fs.unlink(filePath, (err) => { })

        message = 'Arquivo excluído com sucesso!';
    } catch (error) {
        console.log(error)
        message = 'Erro ao excluir arquivo!';
    }

    return message;
}