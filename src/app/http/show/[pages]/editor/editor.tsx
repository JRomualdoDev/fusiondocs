'use client'

import { useEffect, useRef, useState } from 'react';

import EditorJS from '@editorjs/editorjs';

// @ts-ignore
import Header from '@editorjs/header';
import LinkTool from '@editorjs/link';
import { Button } from '@/components/ui/button';
import { saveFile } from './saveFile';

import data from '../../../../bd/banco.json';

// Editor variável
let editor: any;

// Esta função irá garantir que o componente seja renderizado uma única vez
const RenderEditor = ( ElementId: string, dataActual: any ) => {
  const rendered = useRef<false | true>( false )  
  
  useEffect(() => {    
    if ( !rendered.current ) {
      rendered.current = true;
    
      // Aqui chamamos a execução do EditorJS e também podemos passar os parâmetros necessários para execução
      editor = new EditorJS({
        holder: ElementId,
        autofocus: true,
        tools: {
          header: {
            class: Header,
            shortcut: 'CMD+SHIFT+H',
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: 'http://localhost:3000/',
              queryParam: 'search'
            }
          }
        },
        data: dataActual,
        onReady: () => {},
        onChange: () => {}
      });
    } else {
      return
    }
  }, [ ElementId ])

  
}

interface EditorProps {
  page: string
}

export default function Editor({ page }: EditorProps) {

  // Defina aqui o ID para o elemento onde o Editor.js será renderizado
  const elementId = 'editorjs';
  let dataActual;

  // Data para o editor da página correta
  dataActual = data.pages.find((pages: any) => {
    return pages.name === page
  });

  if(!dataActual) {
    dataActual = {
      name: page,
      content: {
          time: Date.now(),
          blocks: [],
          version: "2.29.1"
      }
    }
  }
console.log(dataActual)
  RenderEditor( elementId, dataActual?.content )

  function onSave() {
    console.log(editor)
    if(editor){
      editor.save().then((outputData: any) => {
        console.log(page)
        saveFile(outputData, page).then((data: any) => {
          console.log("Data saved => ",data)
        });
      }).catch((error: any) => {
        console.log('Saving failed: ', error)
      });
    }
  }
  
  return (
    <>
    <div className='bg-slate-50/30 pt-10'>
      <div 
        id={ elementId }
      ></div>
      <div className="me-4 pb-4 flex justify-end">
          <Button 
              variant="outline"
              onClick={onSave}
          >
              Save Document
          </Button>
      </div>
    </div>
    </>
  )
}