"use client"

import Link from "next/link";
import Image from 'next/image'
import { usePathname } from "next/navigation";



// Components Shadcn ui
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator"
import { Button, buttonVariants } from "@/components/ui/button";

import { useContext, useEffect, useState } from "react";

import { loadMenu } from "./loadMenu"
import { handler } from "./crud/createFolder";
import { delFolder, delFile } from "./crud/delete";



import {
    FileText,
    FolderPlus,
    Users,
} from "lucide-react";

import { PopupDeleteFolder } from "./popup/deleteFolder";
import { PopupDeleteFile } from "./popup/deleteFile";
import MenuAccordion from "./components/accordion";
import { toast } from "sonner";
import DropMenu from "./components/dropmenu";
import userContext from "@/app/context/userContext";

// function Sidebar({ className, menus }: SidebarProps) {
function Sidebar() {

    const pathname = usePathname();

    // // Context
    const { isAdmin, setIsAdmin } = useContext(userContext);

    const [inputFolderContent, setInputFolderContent] = useState("");

    const [menu, setMenu] = useState([]);
    const [menuName, setMenuName] = useState('');
    const [menuSubName, setMenuSubName] = useState('');
    const [refreshMenu, setRefreshMenu] = useState(false);
    const [iconHoverMenu, setIconHoverMenu] = useState(false);

    const [refreshIsAdmin, setRefreshIsAdmin] = useState(false);


    const [itemMenu, setItemMenu] = useState("");
    const [subItemMenu, setSubItemMenu] = useState("");

    // Popup
    const [openDelFolderPopup, setOpenDelFolderPopup] = useState(false);
    const [openDelFilePopup, setOpenDelFilePopup] = useState(false);

    useEffect(() => {
        loadMenu().then((menu: any) => {
            setMenu(menu);
        });

    }, [refreshMenu]);


    function folderCreate() {

        // Campo Folder Vazio
        if (inputFolderContent === '') {
            emptyFields();
            return;
        }

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

    function emptyFields() {
        toast("Por Favor preencha o campo", {
            description: "Campo Vazio",
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }

    function handleItemMenu(event: React.ChangeEvent<HTMLInputElement>) {
        setItemMenu(event.target.value);
        setInputFolderContent(event.target.value);
        setSubItemMenu('');
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

    return (
        <div className="flex flex-col space-y-2 w-[270px] border bg-background">
            <div className="space-y-4 pb-2">
                <div className="py-2">
                    <ScrollArea className="min-h-[300px] max-h-screen px-1 relative">
                        <div className="space-y-1 p-2 h-[calc(100vh-82px)] flex flex-col">
                            <div className="mb-8">
                                <Image
                                    src="/logo.png"
                                    width={500}
                                    height={100}
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
                                            <MenuAccordion
                                                key={`${menu}-accordion-${i}`}
                                                menu={menu}
                                                i={i}
                                                subItemMenu={subItemMenu}
                                                setSubItemMenu={setSubItemMenu}
                                                setRefreshMenu={() => setRefreshMenu(!refreshMenu)}
                                                setOpenDelFolderPopup={() => setOpenDelFolderPopup(true)}
                                                menuName={(menuName: string) => setMenuName(menuName)}
                                                setMenuSubName={(menuSubName: string) => setMenuSubName(menuSubName)}
                                                setOpenDelFilePopup={() => setOpenDelFilePopup(true)}
                                            />
                                        )
                                    } else {
                                        return (
                                            <Link
                                                key={`${menu}-${i}`}
                                                className={`${buttonVariants({
                                                    variant: pathname === menu.link ? "default" : "ghost",
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
                            {
                                isAdmin &&
                                <div
                                    className="flex flex-col items-center justify-center gap-2 p-2 mt-4"
                                    onMouseEnter={() => setIconHoverMenu(true)}
                                    onMouseLeave={() => setIconHoverMenu(false)}
                                >
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
                                                onClick={() => folderCreate()}
                                            />
                                        }
                                    </div>
                                </div>
                            }

                        </div>
                        {/* <div className="absolute bottom-1 left-4"> */}
                    </ScrollArea>
                    <div className="inline-flex w-full">
                        <div className="ms-4 mt-5 w-full">
                            <DropMenu />
                        </div>
                        <div className="me-4 mt-5">
                            <Button
                                onClick={() => {
                                    setIsAdmin(!isAdmin);
                                }}
                                className="w-12 h-9"
                                variant="outline"
                            >
                                <Users className="w-4 h-4" />
                            </Button>
                        </div>
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