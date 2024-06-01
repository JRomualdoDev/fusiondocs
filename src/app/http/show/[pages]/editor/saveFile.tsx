'use server'

import { promises as fs } from 'fs';

const filePath = '../../../bd/banco.json';

export async function saveFile(file: string, page: string) {

    // Mensagem de retorno
    let message = '';
    // File Path
    const filepath = process.cwd() + '/src/app/bd/banco.json';

    console.log(file);

    if(page === '') {
        message = 'Erro ao ler o nome da página.';
    }
   
    const data = await fs.readFile(filepath, 'utf8').then((data) => {
            console.log(data)
         
            let json = JSON.parse(data);

            // Caso BD vazio
            if(json.pages.length === 0) {
                json.pages.push({
                    name: page,
                    content: file
                })
            }

            console.log(json)
            for(let obj of json.pages) {
                console.log(obj.name)
                console.log(page)
                if(obj.name.toLowerCase() === page.toLowerCase()) {
                    console.log('Encontrado')
                    obj.content = file;
                    break;
                }
                else {
                    if(!obj.hasOwnProperty(obj.name) )
                    {
                        json.pages.push({
                            name: page,
                            content: file
                        })                       
                    }                  
                }
            }
            console.log(json)
            return json;
        })
        .catch((err) => {
            console.log(err)
            message = 'Erro ao ler o banco de dados.';
        });
        console.log(data)
    fs.writeFile(filepath, JSON.stringify(data)).then((data: any) => {
        message = "Arquivo salvo com sucesso.";
    })
    .catch((err) => {
        console.log(err)
        message = 'Erro ao salvar o arquivo.';
    });
        

    return message;
}