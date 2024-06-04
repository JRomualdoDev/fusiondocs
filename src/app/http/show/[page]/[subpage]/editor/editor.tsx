'use client'

import { useEffect, useRef, useState } from 'react';

import EditorJS from '@editorjs/editorjs';

// @ts-ignore
import Header from '@editorjs/header';
import LinkTool from '@editorjs/link';
import { Button } from '@/components/ui/button';
import { saveFile } from './saveFile';

import { initData } from './initData';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

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

        // Aqui chamamos a execução do EditorJS e também podemos passar os parâmetros necessários para execução
        editor = new EditorJS({
          holder: ElementId,
          autofocus: true,
          //readOnly: true,
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
          onChange: () => {
            setTimeout(() => {
              onSave(page);
            }, 1000);
          }
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


  return (
    <>
      <ScrollArea className=" h-[calc(100vh-100px)] w-full p-4">
        <div className='bg-slate-50/30 pt-10 ps-10'>
          <div
            id={elementId}
          ></div>
          <div className="me-4 pb-4 flex justify-end">
            {/* <Button
              variant="outline"
              onClick={onSave}
            >
              Save Document
            </Button> */}
          </div>
        </div>
      </ScrollArea>
    </>
  )
}

function onSave(page: object) {
  console.log(editor)
  if (editor) {
    editor.save().then((outputData: any) => {
      console.log(page.page)
      saveFile(outputData, page).then((data: any) => {
        setTimeout(() => {
          toast("Arquivo Salvo.", {
            description: "Arquivo Salvo no Servidor.",
            action: {
              label: "Fechar",
              onClick: () => console.log("Fechar"),
            },
          });
        }, 1000);
      });
    }).catch((error: any) => {
      console.log('Saving failed: ', error)
    });
  }
}
