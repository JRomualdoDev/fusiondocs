

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname } from "next/navigation";


import { renameFolder, renameFile } from "../crud/rename";
import { createSubMenu } from "../crud/createSubMenu";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { Tooltip } from "@nextui-org/tooltip";

import {
    Check,
    FilePenLine,
    FileText,
    FolderClosed,
    SquarePlus,
    X
} from "lucide-react";
import { useContext, useRef, useState } from "react";
import { toast } from "sonner";
import userContext from "@/app/context/userContext";

interface menu {
    label: string;
    link: string;
}
interface props {
    menu: {
        label: string;
        link: string;
        icon: any;
        folderName?: string;
        subMenu?: menu[]
    },
    i: string,
    setSubItemMenu: any,
    subItemMenu: string,
    setRefreshMenu: any,
    setOpenDelFolderPopup: any,
    menuName: any,
    setMenuSubName: any,
    setOpenDelFilePopup: any,
}

function MenuAccordion({ menu, setSubItemMenu, subItemMenu, i, setRefreshMenu, setOpenDelFolderPopup, menuName, setMenuSubName,
    setOpenDelFilePopup
}: props) {

    const pathname = usePathname();

    const { isAdmin, setIsAdmin } = useContext(userContext);

    // Rename Folder
    interface FolderState {
        oldNameFolder?: string;
        newNameFolder?: string;
    }

    // Rename File
    interface FileState {
        oldNameFile?: string;
        newNameFile?: string;
        folderName?: string;
    }

    const [inputFileContent, setInputFileContent] = useState({
        subItem: "",
        content: "",
    });

    const [iconHoverSubMenu, setIconHoverSubMenu] = useState(false);
    const [iconHoverRenameMenu, setIconHoverRenameMenu] = useState({ index: '' });
    const [iconHoverRenameSubMenu, setIconHoverRenameSubMenu] = useState({ subIndex: '' });
    const [showInputFolder, setShowInputFolder] = useState({ index: '' });
    const [showInputFile, setShowInputFile] = useState({ subIndex: '' });
    const [newNameFolder, setNewNameFolder] = useState<FolderState>({
        oldNameFolder: '',
        newNameFolder: '',
    });
    const [newNameFile, setNewNameFile] = useState<FileState>({
        oldNameFile: '',
        newNameFile: '',
    });

    /* 
        FUNCTIONS
    */
    function fileCreate(menuLabel: string) {

        // Campo Folder Vazio
        if (inputFileContent.content === '') {
            emptyFields();
            return;
        }

        let tempItemSubMenu = '';
        let tempItemMenu = '';

        // Passar o nome do item para o menu
        tempItemMenu = menuLabel;

        if (subItemMenu !== '') tempItemSubMenu = subItemMenu;

        // Cria subMenu
        createSubMenu(tempItemMenu, tempItemSubMenu).then((data) => {
            toast("Criação SubPasta.", {
                description: data,
                action: {
                    label: "Fechar",
                    onClick: () => console.log("Fechar"),
                },
            });
        });

        // Limpa o input
        setInputFileContent({ subItem: '', content: '' });

        // Atualiza o menu
        setRefreshMenu();
    }

    function handleSubItemMenu(event: React.ChangeEvent<HTMLInputElement>, indexSubMenu: string) {
        setSubItemMenu(event.target.value);
        setInputFileContent({ subItem: indexSubMenu, content: event.target.value });
    }

    function emptyFields() {
        toast("Por Favor preencha o campo", {
            description: "Campo Vazio",
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }

    // Input ativo no menu Folder
    function activeInputFolder(event: React.MouseEvent<SVGSVGElement, MouseEvent>, index: string, menuConfig: string) {
        event.preventDefault();
        setShowInputFolder({ index: index });
        setNewNameFolder({ oldNameFolder: menuConfig });
    }

    // Input ativo no Submenu File
    function activeInputFile(event: React.MouseEvent<SVGSVGElement, MouseEvent>, index: string, menuConfig: string) {
        event.preventDefault();
        setShowInputFile({ subIndex: index });
        setNewNameFile({ oldNameFile: menuConfig });
    }

    function handleRenameInputFolder(event: React.ChangeEvent<HTMLInputElement>) {
        setNewNameFolder({
            newNameFolder: event.target.value,
            oldNameFolder: newNameFolder.oldNameFolder
        });
    }

    function handleRenameInputFile(event: React.ChangeEvent<HTMLInputElement>) {
        setNewNameFile({
            newNameFile: event.target.value,
            oldNameFile: newNameFile.oldNameFile
        });
    }

    // Rename Folder
    function folderRename(event: React.MouseEvent<SVGSVGElement, MouseEvent>) {
        event.preventDefault();

        renameFolder(newNameFolder).then((data: string) => {
            toast("Renomeando Pasta.", {
                description: data,
                action: {
                    label: "Fechar",
                    onClick: () => console.log("Fechar"),
                },
            });
        });
        setShowInputFolder({ index: 'none' });
        // Atualiza o menu
        setRefreshMenu();
    }

    // Rename File
    function fileRename(event: React.MouseEvent<SVGSVGElement, MouseEvent>, menuName: string) {
        console.log(menuName);
        event.preventDefault();
        renameFile(newNameFile, menuName).then((data: string) => {
            toast("Renomeando File.", {
                description: data,
                action: {
                    label: "Fechar",
                    onClick: () => console.log("Fechar"),
                },
            });
        });
        setShowInputFile({ subIndex: 'none' });
        // Atualiza o menu
        setRefreshMenu();
    }

    function deleteFolder(event: React.MouseEvent<SVGSVGElement, MouseEvent>, index: string, menuLabel: string) {
        event.preventDefault();
        // Nome do menu para exclusão
        menuName(menuLabel);

        // Open Popup
        setOpenDelFolderPopup(true);
    }

    function deleteFile(event: React.MouseEvent<SVGSVGElement, MouseEvent>, menuLabel: string, subMenuLabel: string) {
        event.preventDefault();
        // Seta o nome do menu
        menuName(menuLabel);
        // Nome do menu para exclusão
        setMenuSubName(subMenuLabel);
        // Open Popup
        setOpenDelFilePopup(true);
    }

    return (
        <Accordion
            key={`${menu}-${i}`}
            type="single"
            collapsible
            className="w-[245px]"
        >
            <AccordionItem
                key={`${menu}-item-${i}`}
                value={`item-${i}`}
                className="border-b-0"
                onMouseEnter={() => {
                    if (isAdmin) setIconHoverRenameMenu({ index: i });
                }}
                onMouseLeave={() => {
                    if (isAdmin) setIconHoverRenameMenu({ index: 'none' });
                }}
            >
                <Link
                    key={`${menu}-link-${i}`}
                    href={menu.link}
                >
                    <AccordionTrigger
                        className={buttonVariants({
                            //size: "sm",
                            variant: pathname === menu.link ? "default" : "ghost",
                            //align: "flexBetween",
                            className: "hover:no-underline items-center justify-start",
                        })}
                    >

                        <span key={`${menu}-span-${i}`} className="inline-flex gap-1 gap-x-2 items-center justify-center">
                            <FolderClosed className="w-4 h-4" />
                            {
                                showInputFolder?.index === i
                                    ? (
                                        <div className="inline-flex items-center justify-start">
                                            <Input
                                                key={`${menu}-inpput-${i}`}
                                                id={menu.label}
                                                placeholder={menu.label}
                                                className="w-20 h-6"
                                                onClick={(e) => e.preventDefault()}
                                                onChange={handleRenameInputFolder}
                                                autoFocus
                                            />
                                            <Check
                                                className="w-3 h-3 ms-1 hover:text-green-500"
                                                onClick={(e) => folderRename(e)}
                                            />
                                            <X
                                                className="w-3 h-3 ms-1 hover:text-red-500"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setShowInputFolder({ index: 'none' });
                                                }}
                                            />
                                        </div>
                                    )
                                    : (

                                        <div
                                            className="inline-flex items-between justify-between"
                                        >
                                            {
                                                menu.label.length > 8 ?
                                                    <div className="truncate hover:text-clip w-[80px]">
                                                        <Tooltip
                                                            content={menu.label}
                                                            className="mb-1 bg-black text-white rounded-md p-2 border border-black-200"
                                                            delay={2}
                                                            closeDelay={0}
                                                            motionProps={{
                                                                variants: {
                                                                    exit: {
                                                                        opacity: 0,
                                                                        transition: {
                                                                            duration: 0.1,
                                                                            ease: "easeIn",
                                                                        }
                                                                    },
                                                                    enter: {
                                                                        opacity: 1,
                                                                        transition: {
                                                                            duration: 0.15,
                                                                            ease: "easeOut",
                                                                        }
                                                                    },
                                                                },
                                                            }}
                                                        >
                                                            <Label
                                                                htmlFor="label"
                                                            >
                                                                {menu.label}
                                                            </Label>
                                                        </Tooltip>
                                                    </div>
                                                    :
                                                    <Label
                                                        htmlFor="label"

                                                    >
                                                        {menu.label}
                                                    </Label>
                                            }
                                            {/* 
                                            // Tooltip do shadcn ocorreu erro e foi trocado por Tooltip do nextUI
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger
                                                        // asChild
                                                        className="truncate w-[80px]"
                                                    >{menu.label}
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <Label
                                                            htmlFor="label"

                                                        >
                                                            {menu.label}
                                                        </Label>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider> */}
                                            {
                                                iconHoverRenameMenu.index === i &&
                                                (
                                                    <div className="inline-flex items-end justify-end absolute right-1 content-end">
                                                        <FilePenLine
                                                            className="w-4 h-4 ms-4 text-green-300 hover:text-green-600"
                                                            onClick={(e) => activeInputFolder(e, i, menu.label)}
                                                        />
                                                        <X
                                                            className="w-4 h-4 ms-1 text-red-300 hover:text-red-600"
                                                            onClick={(e) => deleteFolder(e, i, menu.label)}
                                                        />
                                                    </div>
                                                )
                                            }
                                        </div>

                                    )
                            }
                        </span>
                    </AccordionTrigger>
                </Link>
                <AccordionContent
                    key={`${menu}-content-${i}`}
                    onMouseEnter={() => {
                        setIconHoverSubMenu(true);
                    }}
                    onMouseLeave={() => {
                        setIconHoverSubMenu(false);
                    }}
                >
                    {menu.subMenu?.map((subItem: any, subIndex: any) => {
                        return (
                            <div
                                key={`${subIndex}-${i}`}
                                className="flex flex-col w-full relative mt-2"
                                onMouseEnter={() => {
                                    if (isAdmin) setIconHoverRenameSubMenu({ subIndex: `${subItem}-${subIndex}-${i}` })
                                }}
                                onMouseLeave={() => {
                                    if (isAdmin) setIconHoverRenameSubMenu({ subIndex: 'none' })
                                }}
                            >
                                {
                                    showInputFile?.subIndex === `${subItem}-${subIndex}-${i}`
                                        ? (
                                            <div key={`${menu}-subDiv-${i}`} className="inline-flex items-center ms-6">
                                                <Input
                                                    id={`${subItem}-${subIndex}-${i}`}
                                                    placeholder={subItem.label}
                                                    className="w-20 h-6"
                                                    onClick={(e) => e.preventDefault()}
                                                    onChange={handleRenameInputFile}
                                                    autoFocus
                                                />
                                                <Check
                                                    className="w-3 h-3 ms-1 hover:text-green-500"
                                                    onClick={(e) => fileRename(e, menu.label)}
                                                />
                                                <X
                                                    className="w-3 h-3 ms-1 hover:text-red-500"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setShowInputFile({ subIndex: 'none' });
                                                    }}
                                                />
                                            </div>
                                        )
                                        : (
                                            <div
                                                key={`${menu}-subdiv1-${i}`}
                                                className="inline-flex items-between justify-between"
                                            >
                                                <Link
                                                    key={`${subIndex}-${i}`}
                                                    href={subItem.link}
                                                    className="w-full"
                                                >

                                                    <Button
                                                        key={`${subIndex}-${i}`}
                                                        variant="ghost"
                                                        size="sm"
                                                        className="w-full justify-start font-normal gap-x-2 ps-6"
                                                    >
                                                        <FileText className="w-4 h-4" />

                                                        {
                                                            subItem.label.length > 8 ?
                                                                <div className="truncate hover:text-clip w-[80px]">
                                                                    <Tooltip
                                                                        content={subItem.label}
                                                                        className="mb-1 bg-black text-white rounded-md p-2 border border-black-200"
                                                                        delay={2}
                                                                        closeDelay={0}
                                                                        motionProps={{
                                                                            variants: {
                                                                                exit: {
                                                                                    opacity: 0,
                                                                                    transition: {
                                                                                        duration: 0.1,
                                                                                        ease: "easeIn",
                                                                                    }
                                                                                },
                                                                                enter: {
                                                                                    opacity: 1,
                                                                                    transition: {
                                                                                        duration: 0.15,
                                                                                        ease: "easeOut",
                                                                                    }
                                                                                },
                                                                            },
                                                                        }}
                                                                    >
                                                                        <Label
                                                                            htmlFor="label"
                                                                        >
                                                                            {subItem.label}
                                                                        </Label>
                                                                    </Tooltip>
                                                                </div>
                                                                :
                                                                <Label
                                                                    htmlFor="label"

                                                                >
                                                                    {subItem.label}
                                                                </Label>
                                                        }
                                                        {
                                                            iconHoverRenameSubMenu.subIndex === `${subItem}-${subIndex}-${i}` &&
                                                            (
                                                                <div className="inline-flex items-end justify-end absolute right-1 content-end">
                                                                    <FilePenLine
                                                                        className="w-4 h-4 ms-4 text-green-300 hover:text-green-600"
                                                                        onClick={(e) => activeInputFile(e, `${subItem}-${subIndex}-${i}`, subItem.label)}
                                                                    />
                                                                    <X
                                                                        className="w-4 h-4 ms-1 text-red-300 hover:text-red-600"
                                                                        onClick={(e) => deleteFile(e, menu.label, subItem.label)}
                                                                    />
                                                                </div>
                                                            )
                                                        }
                                                    </Button>
                                                </Link>
                                            </div>
                                        )
                                }
                            </div>
                        );
                    })}
                    {
                        isAdmin &&
                        <div key={`${menu}-div3-${i}`} className="flex flex-col items-start justify-start gap-2  bg-background p-2 mt-1 w-60">
                            {/* <h3 className="pe-4">Adicionar Sub Menu</h3> */}
                            <div className="inline-flex gap-1 px-2 items-center">
                                <Input
                                    id={`${menu.label}-${i}`}
                                    className="w-[40px]} h-6"
                                    onChange={(e) => handleSubItemMenu(e, i)}
                                    placeholder="Add SubMenu"
                                    value={inputFileContent.subItem === i ? inputFileContent.content : ''}
                                />
                                {
                                    iconHoverSubMenu && (
                                        <SquarePlus
                                            className="w-4 h-4 text-green-700 hover:text-green-400 ms-2 hover:cursor-pointer"
                                            onClick={() => fileCreate(menu.label)}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    }

                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default MenuAccordion;