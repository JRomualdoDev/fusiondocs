'use server'

import { promises as fs } from 'fs';

export async function file(item: String, subItem: String = '', action: String) {

    let modifiedData;
    console.log(item)
    console.log(subItem)
    console.log(action)

    const data = await fs.readFile(process.cwd() + '/src/app/components/sidebar/sideMenu.tsx', 'utf8')

    // Remove a parte de importação/exportação
    const cleanedData = data.replace(/^.*?=\s*(\[.*?\]);?\s*$/s, '$1');

    // Remove caracteres extras e adiciona aspas duplas em torno dos nomes das propriedades
    const jsonData = cleanedData.replace(/(\w+)\s*:/g, '"$1":');

    // Converte a string para JSON
    const parsedData = JSON.parse(jsonData);
   
    if(action === 'create') {
        if(subItem) {
            parsedData.forEach((menuItem: any) => {
                if(menuItem.label === item) {
                    menuItem.subMenu.unshift({
                        label: subItem,
                        link: `/${item}/${subItem}`,
                    });
                }
            })
        }
        else {
            parsedData.unshift({
                label: item, 
                link: `/${item}`,
                isParent: true,
                subMenu: [],
            });
        }
        
        modifiedData = parsedData;
        console.log(modifiedData)
    }

    if(action === 'delete') {
        //Delete subItem
        if(subItem) {
            parsedData.forEach((menuItem: any) => {
                if(menuItem.label === item) {
                    console.log(menuItem.label)   
                    menuItem.subMenu.forEach((subMenuItem: any) => {
                        if(subMenuItem.label === subItem) {
                            menuItem.subMenu = menuItem.subMenu.filter((subMenuItem: any) => {    
                                console.log(subMenuItem.label)                         
                                return !(subMenuItem.label === subItem)
                            });
                        }                       
                    })
                }
            });
            
            modifiedData = parsedData;
        }
        else {
            // Delete item 
            modifiedData = parsedData.filter((menuItem: any) => {
                return menuItem.label !== item
            });
        }
    }

    console.log(modifiedData)
   // Convert the JSON data to a formatted string
    const formattedData = `import { NavItems } from "./sidebar";
        export const sideMenu: NavItems[] = ${JSON.stringify(modifiedData, null, 2)};
        `;

    // Salvar as mudanças de volta no arquivo JavaScript
    await fs.writeFile(process.cwd() + '/src/app/components/sidebar/sideMenu.tsx', formattedData, 'utf8');

    return subItem;
}

