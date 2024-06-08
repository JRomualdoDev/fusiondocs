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
import { Circle } from 'lucide-react';

import { AlertDialogDemo } from './popup/save';

// Editor variável
var editor: any;
let dataInit: any;

// Esta função irá garantir que o componente seja renderizado uma única vez
const RenderEditor = (ElementId: string, page: any) => {

  const [editorJS, setEditorJS] = useState(null);
  const [color, setColor] = useState('gray');
  const [isFocused, setFocused] = useState(false);

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
          // autofocus: true,
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
          onReady: async () => {
            setEditorJS(editor);
          },
          onChange: () => {
            setTimeout(() => {
              let lostFocus = onSave(page);
              setColor('gray');
            }, 1000);
            setColor('green');
          }
        });

      }
      fetchData();
    } else {
      return
    }
  })

  useEffect(() => {
    if (!editorJS) return
    const holderId = ElementId
    const editorElement = document.getElementById(holderId)
    const onFocusIn = () => setFocused(true)
    const onFocusOut = () => setFocused(false)
    editorElement?.addEventListener("focusin", onFocusIn)
    editorElement?.addEventListener("focusout", onFocusOut)

    return () => {
      editorElement?.removeEventListener("focusin", onFocusIn)
      editorElement?.removeEventListener("focusout", onFocusOut)
    }
  }, [ElementId, editorJS])

  const editorData = [editorJS, color, isFocused];
  return editorData;
}


interface EditorProps {
  pages: object
}

export default function Editor({ page }: any) {

  const [editorLostFocus, setEditorLostFocus] = useState(false);

  // Defina aqui o ID para o elemento onde o Editor.js será renderizado
  const elementId = 'editorjs';

  let editorData = RenderEditor(elementId, page);

  return (
    <>
      {<div className="w-full flex justify-end pe-4  ">
        <Circle
          size={12}
          color={editorData[1] as string ?? 'gray'}
        />
      </div>}

      <ScrollArea className=" h-[calc(100vh-100px)] w-full p-4">
        <div className='bg-slate-50/30 pt-10 ps-10'>
          <div
            id={elementId}
          ></div>
        </div>
      </ScrollArea>
      {
        // Editor Lost Focus === true e cor verde(salvando) não clique em nada
        (editorData[2] === false && editorData[1] == "green") &&
        <div>
          <AlertDialogDemo />
        </div >
      }

    </>
  )
}

interface EditorProps {
  page: string,
  subpage: string
}

function onSave(page: EditorProps) {
  let lostFocus = false;

  if (editor) {
    editor.save().then((outputData: any) => {
      saveFile(outputData, page).then((data: any) => {
      });
    }).catch((error: any) => {
      console.log('Saving failed: ', error)
    });
  }
}

