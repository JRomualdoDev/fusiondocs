'use client'

import { useContext, useEffect, useRef, useState } from 'react';

import EditorJS from '@editorjs/editorjs';

import userContext from '@/app/context/userContext';


import { useChat } from 'ai/react';

import { saveFile } from './saveFile';

import { initData } from './initData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlignLeft, Circle, CircleCheck, NotebookPenIcon, Save } from 'lucide-react';

import { AlertDialogDemo } from './popup/save';
import { Label } from '@/components/ui/label';
import Tools from './tools/tools';
import Link from 'next/link';

// Editor variável
var editor: any;
let dataInit: any;

// Esta função irá garantir que o componente seja renderizado uma única vez
const RenderEditor = (ElementId: string, page: any) => {

  const { messages, input, setInput, handleInputChange, handleSubmit, append } = useChat({
    api: 'http://localhost:3000/api/chat',
  });

  const [editorJS, setEditorJS] = useState();
  const [color, setColor] = useState('gray');
  const [isFocused, setFocused] = useState(false);
  const [data, setData] = useState<object>({});


  const { isAdmin, setIsAdmin } = useContext(userContext);

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
          //readOnly: isAdmin,
          tools: Tools(append, messages),
          data: dataInit,
          onReady: async () => {
            setEditorJS(editor);
          },
          onChange: async (api, event) => {
            if (api.readOnly.isEnabled === false) {
              await api.saver.save().then((data: any) => {
                setData(data);
                // Salva no arquivo
                saveFile(data, page).then((message: string) => {
                  if (message === 'Arquivo salvo com sucesso!') {
                    {
                      setColor('green');
                      setTimeout(() => {
                        setColor('gray');
                      }, 1000);
                    }
                  }
                });

              });
            }
            else {
              setData(dataInit);
            }
          }

        });
      }
      fetchData();
    } else {
      return
    }
  });

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

  useEffect(() => {
    if (!editorJS) return
    editor.readOnly.toggle(!isAdmin)
  }, [editorJS, isAdmin])

  const editorData = [editorJS, color, isFocused, data];
  return editorData;
}


interface EditorProps {
  page: object
}

export default function Editor({ page }: EditorProps) {

  // Defina aqui o ID para o elemento onde o Editor.js será renderizado
  const elementId = 'editorjs';

  let editorData: any = RenderEditor(elementId, page);

  // let ancoras: object[] = [];
  let editorJS = editorData[0];
  let color = editorData[1];
  let focused = editorData[2];
  let data = editorData[3];


  /* Ancoras */
  // Seleciona o elemento data-anchor
  const anchorEl = document.querySelectorAll('[data-anchor]');

  // Percorre todos os elementos data-anchor
  anchorEl.forEach((anchorEl: any) => {
    // Pega o valor 
    const anchorValue = anchorEl.getAttribute('data-anchor');

    // Cria um elemento de âncora invisivel 
    const anchorInvisible = document.createElement('a');
    anchorInvisible.id = anchorValue;
    anchorEl.parentNode.insertBefore(anchorInvisible, anchorEl);

    // Ajusta o href dos links
    const links = document.querySelectorAll(`a[href="#${anchorValue}"]`);
    links.forEach((link: any) => {
      link.href = `#${anchorValue}`;
    });
  })


  return (
    <div className="flex flex-col h-[calc(100vh-100px)] w-full p-4">


      <div className='w-full inline-flex h-[calc(100vh-100px)]'>
        <div className='pt-10 ps-10 w-[1024px]'>
          <div className="flex justify-end xl:pe-[20%] md:pe-[15%] sm:pe-0">
            {
              // cor verde(salvando)
              (color == "green") &&
              <Label className="text-xs font-semibold text-green-500 pe-2 items-center">Salvando</Label>
            }

            <NotebookPenIcon
              size={18}
              color={color as string ?? 'gray'}
            />
          </div>

          <ScrollArea className="h-[calc(100vh-220px)]">
            <div
              id={elementId}
            ></div>
          </ScrollArea>
        </div>
        <div className='flex flex-col w-[300px] ps-4'>
          <div className="inline-flex h-8 mt-2 items-center">
            <AlignLeft className='w-5 h-5 me-2' />
            <Label>Nesta Página</Label>
          </div>
          {
            data.blocks?.map((item: { id: string, type: string, data: { text: string, anchor: string } }, i: number) => {

              if (item.type === 'header') {
                return (
                  <div
                    key={`${item}-${i}`}
                    className=" h-[30px] w-full ps-4 pt-1 border-l"
                  >
                    <Link
                      href={`#${item.data.anchor}` ?? '#'}
                      className=''
                    >
                      {item.data.text}
                    </Link>
                  </div>
                )
              }

            })
          }
        </div>
      </div>

      {
        // Editor Lost Focus === true e cor verde(salvando) não clique em nada
        (focused === false && color == "green") &&
        <div>
          <AlertDialogDemo />
        </div >
      }
    </div>

  )
}


