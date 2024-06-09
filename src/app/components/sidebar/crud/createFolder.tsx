'use server'

// pages/api/createFile.ts
import fs from 'fs';
import path from 'path';
import { redirect } from 'next/navigation'

export async function handler(folderName: string) {
  let message: string = '';

  // Limpa a string do nome da pasta para sempre minuscula e sem acentos
  folderName = folderName.normalize("NFD").replace(/[^a-zA-Z\s]/g, "");
  // Sem espaços
  folderName = folderName.replace(/\s+/g, '');

  try {
    // Verifica se os nomes da pasta e do arquivo são válidos
    if (!folderName) {
      return;
    }

    // Defina o caminho para a nova pasta e arquivo
    const folderPath = path.join(process.cwd(), 'src/app/bd', folderName);
    const filePath = path.join(folderPath, `index.json`);

    // Cria a pasta se não existir
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
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


