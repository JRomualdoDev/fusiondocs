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