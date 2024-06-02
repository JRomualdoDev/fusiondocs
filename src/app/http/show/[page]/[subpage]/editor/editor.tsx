'use client'

import { useEffect, useRef, useState } from 'react';

import EditorJS from '@editorjs/editorjs';

// @ts-ignore
import Header from '@editorjs/header';
import LinkTool from '@editorjs/link';
import { Button } from '@/components/ui/button';
import { saveFile } from './saveFile';

import { initData } from './initData';

// Editor variável
let editor: any;
let dataInit: any;

// Esta função irá garantir que o componente seja renderizado uma única vez
const RenderEditor = (ElementId: string, page: any) => {
  const rendered = useRef<false | true>(false)

  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;

      // Load Dados Iniciais
      const fetchData = async () => {
        dataInit = await initData(page);
        console.log(dataInit)
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
          data: dataInit,
          onReady: () => { },
          onChange: () => { }
        });
      }
      fetchData();

    } else {
      return
    }
  })
}

interface EditorProps {
  pages: object
}

export default function Editor({ page }: any) {

  // Defina aqui o ID para o elemento onde o Editor.js será renderizado
  const elementId = 'editorjs';

  RenderEditor(elementId, page);

  function onSave() {
    console.log(editor)
    if (editor) {
      editor.save().then((outputData: any) => {
        console.log(page.page)
        saveFile(outputData, page).then((data: any) => {
          console.log("Data saved => ", data)
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
          id={elementId}
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