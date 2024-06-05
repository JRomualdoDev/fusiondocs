'use server'

// pages/api/createFile.ts
import fs from 'fs';
import path from 'path';

export async function handler(folderName: string) {
  let message: string = '';
  try {
    // Verifica se os nomes da pasta e do arquivo são válidos
    if (!folderName) {
      return;
    }

    // Defina o caminho para a nova pasta e arquivo
    const folderPath = path.join(process.cwd(), 'src/app/bd', folderName);
    const filePath = path.join(folderPath, `index.json`);

    console.log('Caminho da pasta:', folderPath);
    console.log('Caminho do arquivo:', filePath);

    // Cria a pasta se não existir
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log('Pasta criada:', folderPath);
    }
    else {
      throw new Error('Pasta já existe.');
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

    // Message Sucesso
    message = 'Pasta criada com sucesso.';

  } catch (error: any) {
    message = error.message;
  }
  return message;
}


