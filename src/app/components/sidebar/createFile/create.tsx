'use server'

// pages/api/createFile.ts
import fs from 'fs';
import path from 'path';
import { loadMenu } from '../loadMenu';

export async function handler(folderName: string, fileName: string = "banco") {
  try {
    // Verifica se os nomes da pasta e do arquivo são válidos
    if (!folderName || !fileName) {
      return;
    }

    // Defina o caminho para a nova pasta e arquivo
    const folderPath = path.join(process.cwd(), 'src/app/bd', folderName);
    const filePath = path.join(folderPath, `${fileName}.json`);

    console.log('Caminho da pasta:', folderPath);
    console.log('Caminho do arquivo:', filePath);

    // Cria a pasta se não existir
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log('Pasta criada:', folderPath);
    }

    // Cria conteúdo inicial do arquivo
    const fileContent = `
      {
        "label": "${folderName}",
        "link": "/${folderName}",
        "isParent": true,
        "subMenu": []
      }`;

    // Escreve o conteúdo no arquivo
    fs.writeFileSync(filePath, fileContent);
    console.log('Arquivo criado:', filePath);
  } catch (error) {
    console.error('Erro ao criar pasta ou arquivo:', error);
  }
}
