"use client"

import Link from "next/link";
import Image from 'next/image'
import { usePathname } from "next/navigation";
import { createSubMenu } from "./crud/createSubMenu";
import { useTheme } from "next-themes"

// Components Shadcn ui
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator"
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label"

import { toast } from "sonner";

import { useEffect, useState } from "react";

import { loadMenu } from "./loadMenu"
import { handler } from "./crud/createFolder";
import { renameFolder, renameFile } from "./crud/rename";
import { delFolder, delFile } from "./crud/delete";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {
    FolderClosed,
    FileText,
    FolderPlus,
    SquarePlus,
    Sun,
    Moon,
    Check,
    FilePenLine,
    X

} from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { PopupDeleteFolder } from "./popup/deleteFolder";
import { PopupDeleteFile } from "./popup/deleteFile";

// function Sidebar({ className, menus }: SidebarProps) {
function Sidebar() {

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

    const [itemMenu, setItemMenu] = useState("");
    const [subItemMenu, setSubItemMenu] = useState("");
    const [inputFolderContent, setInputFolderContent] = useState("");
    const [inputFileContent, setInputFileContent] = useState({
        subItem: "",
        content: "",
    });
    const [menu, setMenu] = useState([]);
    const [menuName, setMenuName] = useState('');
    const [menuSubName, setMenuSubName] = useState('');
    const [refreshMenu, setRefreshMenu] = useState(false);
    const [iconHoverMenu, setIconHoverMenu] = useState(false);
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

    // Popup
    const [openDelFolderPopup, setOpenDelFolderPopup] = useState(false);
    const [openDelFilePopup, setOpenDelFilePopup] = useState(false);

    // Theme 
    const { setTheme } = useTheme();

    function folderCreate(menuLabel: string) {

        // Campo Folder Vazio
        if (inputFolderContent === '') {
            emptyFields();
            return;
        }

        // Cria o menu primeira vez
        // Cria a pasta e o arquivo
        handler(itemMenu).then((data) => {
            toast("Criação Pasta.", {
                description: data,
                action: {
                    label: "Fechar",
                    onClick: () => console.log("Fechar"),
                },
            });
        });

        // Limpa o input
        setInputFolderContent('');

        // Atualiza o menu
        setRefreshMenu(!refreshMenu);
    }

    function fileCreate(menuLabel: string) {

        // Campo Folder Vazio
        if (inputFileContent.content === '') {
            emptyFields();
            return;
        }

        let tempItemSubMenu = '';
        let tempItemMenu = '';

        // Passar o nome do item para o menu
        itemMenu === '' ? tempItemMenu = menuLabel : tempItemMenu = itemMenu;

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
        setRefreshMenu(!refreshMenu);
    }

    function deleteFolder(event: React.MouseEvent<SVGSVGElement, MouseEvent>, index: string, menuLabel: string) {
        event.preventDefault();
        // Nome do menu para exclusão
        setMenuName(menuLabel);
        // Open Popup
        setOpenDelFolderPopup(true);
    }

    function deleteFile(event: React.MouseEvent<SVGSVGElement, MouseEvent>, menuLabel: string, subMenuLabel: string) {
        event.preventDefault();
        // Seta o nome do menu
        setMenuName(menuLabel);
        // Nome do menu para exclusão
        setMenuSubName(subMenuLabel);
        // Open Popup
        setOpenDelFilePopup(true);
    }

    // Delete Folder
    function handleDeleteFolder() {
        console.log('deletePopup');
        setOpenDelFolderPopup(false);
        delFolder(menuName).then((data: string) => {
            toast("Excluindo Pasta.", {
                description: data,
                action: {
                    label: "Fechar",
                    onClick: () => console.log("Fechar"),
                },
            });
        });
        // Atualiza o menu
        setRefreshMenu(!refreshMenu);

    }

    // Delete File
    function handleDeleteFile() {
        console.log('deletePopup');
        setOpenDelFilePopup(false);
        delFile(menuName, menuSubName).then((data: string) => {
            toast("Excluindo Arquivo.", {
                description: data,
                action: {
                    label: "Fechar",
                    onClick: () => console.log("Fechar"),
                },
            });
        });
        // Atualiza o menu
        setRefreshMenu(!refreshMenu);

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
        setRefreshMenu(!refreshMenu);
    }

    // Rename File
    function fileRename(event: React.MouseEvent<SVGSVGElement, MouseEvent>, menuName: string) {
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
        setRefreshMenu(!refreshMenu);
    }

    // Input ativo no menu Folder
    function activeInputFolder(event: React.MouseEvent<SVGSVGElement, MouseEvent>, index: string, menuConfig: string) {
        event.preventDefault();
        setShowInputFolder({ index: index });
        console.log(menuConfig);
        setNewNameFolder({ oldNameFolder: menuConfig });
    }

    // Input ativo no Submenu File
    function activeInputFile(event: React.MouseEvent<SVGSVGElement, MouseEvent>, index: string, menuConfig: string) {
        event.preventDefault();
        setShowInputFile({ subIndex: index });
        setNewNameFile({ oldNameFile: menuConfig });
    }

    function handleItemMenu(event: React.ChangeEvent<HTMLInputElement>) {
        setItemMenu(event.target.value);
        setInputFolderContent(event.target.value);
        setSubItemMenu('');
    }

    function handleSubItemMenu(event: React.ChangeEvent<HTMLInputElement>, indexSubMenu: string) {
        setSubItemMenu(event.target.value);
        setInputFileContent({ subItem: indexSubMenu, content: event.target.value });
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

    function emptyFields() {
        toast("Por Favor preencha o campo", {
            description: "Campo Vazio",
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }

    useEffect(() => {
        loadMenu().then((menu: any) => {
            setMenu(menu);
        });

    }, [refreshMenu]);

    const pathname = usePathname()

    return (
        <div className="flex flex-col space-y-2 w-[260px] border bg-background ">
            {/* <div className={cn("pb-12", className)}> */}
            <div className="space-y-4 pb-2">
                <div className="py-2">
                    <ScrollArea className="min-h-[300px] max-h-screen px-2 relative">
                        <div className="space-y-1 p-2 h-[calc(100vh-122px)] flex flex-col">
                            <div className="mb-4 ">
                                <Image
                                    src="/logo.png"
                                    width={500}
                                    height={500}
                                    alt="Picture of the author"
                                />
                            </div>
                            {
                                menu.map((menu: any, i: any) => {
                                    if (menu.isParent === false && menu.link === "javascript:;") {
                                        return <strong
                                            key={`${menu}-${i}`}
                                            className="font-bold inline-flex items-start justify-start text-xs text-gray-700 dark:text-gray-400"
                                        >{menu.label}
                                        </strong>
                                    } else if (menu.isParent && menu.link !== "javascript::") {
                                        return (
                                            <Accordion
                                                key={`${menu}-${i}`}
                                                type="single"
                                                collapsible
                                            >
                                                <AccordionItem
                                                    value={`item-${i}`}
                                                    className="border-b-0"
                                                    onMouseEnter={() => setIconHoverRenameMenu({ index: i })}
                                                    onMouseLeave={() => setIconHoverRenameMenu({ index: 'none' })}
                                                >
                                                    <Link
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

                                                            <span className="inline-flex gap-1 gap-x-2 items-center justify-center">
                                                                {/* {menu.icon} {menu.label} */}
                                                                <FolderClosed className="w-4 h-4" />
                                                                {
                                                                    showInputFolder?.index === i
                                                                        ? (
                                                                            <div className="inline-flex items-center justify-center">
                                                                                <Input
                                                                                    id={menu.label}
                                                                                    placeholder={menu.label}
                                                                                    className="w-20 h-6"
                                                                                    onClick={(e) => e.preventDefault()}
                                                                                    onChange={handleRenameInputFolder}
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
                                                                                <TooltipProvider>
                                                                                    <Tooltip>
                                                                                        <TooltipTrigger
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
                                                                                </TooltipProvider>
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
                                                                    className="flex flex-col w-full relative"
                                                                    onMouseEnter={() => {
                                                                        setIconHoverRenameSubMenu({ subIndex: `${subItem}-${subIndex}-${i}` })
                                                                    }}
                                                                    onMouseLeave={() => {
                                                                        setIconHoverRenameSubMenu({ subIndex: 'none' })
                                                                    }}
                                                                >
                                                                    {
                                                                        showInputFile?.subIndex === `${subItem}-${subIndex}-${i}`
                                                                            ? (
                                                                                <div className="inline-flex items-center justify-center">
                                                                                    <Input
                                                                                        id={`${subItem}-${subIndex}-${i}`}
                                                                                        placeholder={subItem.label}
                                                                                        className="w-20 h-6"
                                                                                        onClick={(e) => e.preventDefault()}
                                                                                        onChange={handleRenameInputFile}
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

                                                                                            {subItem.label}
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
                                                        <div className="flex flex-col items-center justify-center gap-2  bg-background p-2 mt-1">
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

                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        )
                                    } else {
                                        return (
                                            <Link
                                                key={`${menu}-${i}`}
                                                className={`${buttonVariants({
                                                    //size: "sm",
                                                    variant: pathname === menu.link ? "default" : "ghost",
                                                    //align: "flexLeft",
                                                })} w-full !items-start !justify-start`}
                                                href={menu.link}
                                            >
                                                <span className="inline-flex items-center justify-center gap-1">
                                                    {/* {menu.icon} {menu.label} */}
                                                    <FileText className="w-4 h-4" /> {menu.label}
                                                </span>
                                            </Link>
                                        )
                                    }
                                })
                            }
                            <div
                                className="flex flex-col items-center justify-center gap-2 p-2 mt-4"
                                onMouseEnter={() => setIconHoverMenu(true)}
                                onMouseLeave={() => setIconHoverMenu(false)}
                            >
                                {/* <h3 className="pe-4">Adicionar Item Menu</h3> */}
                                <Separator />
                                <div className="inline-flex gap-1 px-2 items-center mt-2">
                                    <Input
                                        className="w-[40px]} h-6"
                                        onChange={handleItemMenu}
                                        placeholder="Add Menu"
                                        value={inputFolderContent}
                                    />
                                    {
                                        iconHoverMenu &&
                                        <FolderPlus
                                            className="w-6 h-6 text-green-700 hover:text-green-400 ms-2 hover:cursor-pointer"
                                            onClick={() => folderCreate('')}
                                        />
                                    }
                                </div>

                            </div>
                        </div>
                        {/* <div className="absolute bottom-1 left-4"> */}
                    </ScrollArea>
                    <div className="ms-4 mt-5">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                    Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                    System
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                {
                    <PopupDeleteFolder
                        open={openDelFolderPopup}
                        close={() => setOpenDelFolderPopup(false)}
                        popupDelFolder={handleDeleteFolder}
                        menuName={menuName}
                    />
                }
                {
                    <PopupDeleteFile
                        open={openDelFilePopup}
                        close={() => setOpenDelFilePopup(false)}
                        popupDelFile={handleDeleteFile}
                        fileName={menuSubName}
                    />
                }
            </div>
        </div>
    )
}

export default Sidebar;