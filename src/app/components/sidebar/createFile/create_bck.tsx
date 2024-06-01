'use server'

// pages/api/createFile.ts
import fs from 'fs';
import path from 'path';

export async function handler(folderName: string, fileName: string = "page") {
  try {
      
      console.log('Recebendo solicitação para criar pasta e arquivo:', folderName, fileName);

      // Verifica se os nomes da pasta e do arquivo são válidos
      if (!folderName || !fileName) {
        return;
      }

      // Defina o caminho para a nova pasta e arquivo
      const folderPath = path.join(process.cwd(), 'src/app/', folderName);
      const filePath = path.join(folderPath, `${fileName}.tsx`);

      console.log('Caminho da pasta:', folderPath);
      console.log('Caminho do arquivo:', filePath);

      // Cria a pasta se não existir
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log('Pasta criada:', folderPath);
      }

      // Cria o arquivo TSX com um conteúdo básico
      const fileContent = `
        import React from 'react';

        const ${fileName}: React.FC = () => {
          return <div>Hello from ${fileName}</div>;
        };

        export default ${fileName};
        `;

      // Escreve o conteúdo no arquivo
      fs.writeFileSync(filePath, fileContent);
      console.log('Arquivo criado:', filePath);
    
  } catch (error) {
    console.error('Erro ao criar pasta ou arquivo:', error);
  }
}
