'use server'

import { promises as fs } from 'fs';

export async function file(item: String, subItem: String = '', action: String) {

    

    

    console.log(item)
    console.log(subItem)
    console.log(action)
    const data = await fs.readFile(process.cwd() + '/src/app/components/sidebar/sideMenu.tsx', 'utf8')

    /// Remove os itens indesejados
    //const cleanedData = data.replace(/,\s*{\s*label:\s*"\w*"\s*,\s*link:\s*"\w*"\s*,\s*isParent:\s*(true|false)\s*,\s*subMenu:\s*\[\s*\]\s*\}\s*/g, '');
    // Remove a parte de importação/exportação
    const cleanedData = data.replace(/^.*?=\s*(\[.*?\]);?\s*$/s, '$1');
    // Remove caracteres extras
    const sanitizedData = cleanedData.replace(/[\r\n]+/g, '');
console.log(sanitizedData)
// Adiciona aspas duplas em volta das chaves e dos valores
const jsonData = sanitizedData.replace(/(\w+)\s*:/g, '"$1":');
    

    // Imprime o JSON resultante
//     console.log(jsonData);

// console.log(data)
//     let regex = new RegExp('');
//     let modifiedData = '';

//     if(action === 'create') {
//         if(subItem) {
//             regex = new RegExp(`(label: "${item}",[\\s\\S]*?subMenu: \\[)([\\s\\S]*?\\])`);
//             modifiedData = data.replace(
//                 regex,
//                 `$1\n ${subItem}$2`
//             );
//         }
//         else {
//             // Expressão regular para encontrar o início do array `sideMenu`
//             regex = /(NavItems\[\] = \[\r\n)/;
//             modifiedData = data.replace(
//                 regex,
//                 `$1{
//                 label: "${item}",
//                 link: "/${item}",
//                 isParent: true,
//                 subMenu: [],           
//             },`);
//             console.log(modifiedData)
//         }
//     }

//     if(action === 'delete') {

//         // Regex para encontrar o item do menu principal
//         const menuItemRegex = new RegExp(`\\{\\s*label:\\s*"${item}"[^}]*subMenu:\\s*\\[(?:[^\\]]*\\])*\\}[^,]*,?`, 'g');

//         if(subItem) {
//             // Regex para encontrar o subitem do menu dentro do menu principal
//             const subMenuItemRegex = new RegExp(`\\{\\s*label:\\s*"${subItem}"[^}]*\\},?`, 'g');

//             modifiedData = data.replace(menuItemRegex, (match) => {
//                 console.log(match)
//                 const updatedMatch = match.replace(subMenuItemRegex, '').replace(/,\s*]/, ']');
//                 return updatedMatch.includes('label:') ? updatedMatch : '';
//             });
//             console.log(modifiedData)
//             // regex = new RegExp(`\\s*\\{\\s*label:\\s*"${subItem}",[\\s\\S]*?\\},?\\n`, 'g');
//             // // Remover o item do array
//             // modifiedData = data.replace(regex, '');
//         }
//         else {
//             // Se não há subLabel, remove o menu principal
//             modifiedData = item.replace(menuItemRegex, '');
//             console.log(modifiedData)
//         }

//     }
//     console.log(modifiedData)
    // Salvar as mudanças de volta no arquivo JavaScript
    //await fs.writeFile(process.cwd() + '/src/app/components/sidebar/sideMenu.tsx', modifiedData, 'utf8');

    return subItem;
}

