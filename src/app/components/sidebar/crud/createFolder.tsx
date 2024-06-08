'use server'

// pages/api/createFile.ts
import fs from 'fs';
import path from 'path';
import { redirect } from 'next/navigation'

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
        "link": "/http/show/${folderName}",
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

  // https://stackoverflow.com/questions/76191324/next-13-4-error-next-redirect-in-api-routes
  // Ocorre um erro ao usar o redirect dentro o try catch
  if (message === 'Pasta criada com sucesso.') {
    // Redirect para url criada
    redirect(`/http/show/${folderName}`);
  }

  return message;
}


