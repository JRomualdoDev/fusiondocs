"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createSubMenu } from "./createSubMenu";
import { useTheme } from "next-themes"

// Components Shadcn ui
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator"
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";

import { useEffect, useState } from "react";

import { loadMenu } from "./loadMenu"
import { handler } from "./createFolder";


import {
    FolderClosed,
    FileText,
    FolderPlus,
    SquarePlus,
    Sun,
    Moon

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


// function Sidebar({ className, menus }: SidebarProps) {
function Sidebar() {

    const [itemMenu, setItemMenu] = useState("");
    const [subItemMenu, setSubItemMenu] = useState("");
    const [inputContent, setInputContent] = useState("");
    const [menu, setMenu] = useState([]);
    const [refreshMenu, setRefreshMenu] = useState(false);
    const [iconHoverMenu, setIconHoverMenu] = useState(false);
    const [iconHoverSubMenu, setIconHoverSubMenu] = useState(false);

    // Theme 
    const { setTheme } = useTheme();

    function fileCreate(menuLabel: string) {

        if (inputContent === '') {
            emptyFields();
            return;
        }

        let tempItemSubMenu = '';
        let tempItemMenu = '';

        // Passar o nome do item para o menu
        itemMenu === '' ? tempItemMenu = menuLabel : tempItemMenu = itemMenu;

        if (subItemMenu !== '') tempItemSubMenu = subItemMenu;

        // Cria o menu primeira vez
        if (tempItemSubMenu === '') {
            // Cria a pasta e o arquivo
            handler(`${tempItemMenu}`).then((data) => {
                toast("Criação Pasta.", {
                    description: data,
                    action: {
                        label: "Fechar",
                        onClick: () => console.log("Fechar"),
                    },
                });
            });
        }
        else {
            // Cria subMenu
            createSubMenu(tempItemMenu, tempItemSubMenu, 'create').then((data) => {
                toast("Criação SubPasta.", {
                    description: data,
                    action: {
                        label: "Fechar",
                        onClick: () => console.log("Fechar"),
                    },
                });
            });
        }

        // Atualiza o menu
        setRefreshMenu(!refreshMenu);
    }

    function fileDelete(menuLabel: string) {

        if (inputContent === '') {
            emptyFields();
            return;
        }

        let newSubItemMenu = '';
        let tempItemMenu = '';

        // Passar o nome do item para o menu
        itemMenu === "" ? tempItemMenu = menuLabel : tempItemMenu = itemMenu;

        if (subItemMenu !== '') newSubItemMenu = subItemMenu

        //file(tempItemMenu , newSubItemMenu, 'delete').then(data => console.log(data));
    }

    function handleItemMenu(event: React.ChangeEvent<HTMLInputElement>) {
        setItemMenu(event.target.value);
        setInputContent(event.target.value);
        setSubItemMenu('');
    }

    function handleSubItemMenu(event: React.ChangeEvent<HTMLInputElement>) {
        setSubItemMenu(event.target.value);
        setInputContent(event.target.value);
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
        <div className="flex flex-col space-y-2 w-[260px] border bg-background">
            {/* <div className={cn("pb-12", className)}> */}
            <div className="space-y-4 pb-2">
                <div className="py-2">
                    <ScrollArea className="min-h-[300px] max-h-screen px-2">
                        <div className="space-y-1 p-2 h-[calc(100vh-28px)]">
                            <div className="mb-8">
                                <img src="/logo.png" className="w-[300px] h-12 border bg-background" alt="logo" />
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
                                                <AccordionItem value={`item-${i}`} className="border-b-0">
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
                                                            {menu.label}
                                                        </span>
                                                    </AccordionTrigger>
                                                    <AccordionContent
                                                        onMouseEnter={() => setIconHoverSubMenu(true)}
                                                        onMouseLeave={() => setIconHoverSubMenu(false)}
                                                    >
                                                        {menu.subMenu?.map((subItem: any, subIndex: any) => (
                                                            <Link
                                                                key={`${subIndex}-${i}`}
                                                                href={subItem.link}>
                                                                <Button
                                                                    key={`${subIndex}-${i}`}
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="w-full justify-start font-normal gap-x-2 ps-6"
                                                                >
                                                                    <FileText className="w-4 h-4" />

                                                                    {subItem.label}
                                                                </Button>
                                                            </Link>
                                                        ))}
                                                        <div className="flex flex-col items-center justify-center gap-2  bg-background p-2 mt-1">
                                                            {/* <h3 className="pe-4">Adicionar Sub Menu</h3> */}
                                                            <div className="inline-flex gap-1 px-2 items-center">
                                                                <Input
                                                                    className="w-[40px]} h-6"
                                                                    onChange={handleSubItemMenu}
                                                                    placeholder="Add SubMenu"
                                                                />
                                                                {
                                                                    iconHoverSubMenu && (
                                                                        <SquarePlus
                                                                            className="w-4 h-4 text-green-700 hover:text-green-400 ms-2 hover:cursor-pointer"
                                                                            onClick={() => fileCreate(menu.label)}
                                                                        />
                                                                    )
                                                                }


                                                                {/* <Input
                                                                            className="w-[40px]} h-8"
                                                                            onChange={handleSubItemMenu}
                                                                        />
                                                                        <Button
                                                                            variant="outline"
                                                                            className="w-[50px] justify-start font-normal bg-green-500 text-white hover:bg-green-600"
                                                                            onClick={() => fileCreate(menu.label)}
                                                                        >
                                                                            <Check className="w-8 h-8" />
                                                                        </Button>
                                                                        <Button
                                                                            variant="outline"
                                                                            className="w-[50px] justify-start font-normal bg-red-500 text-white hover:bg-red-600"
                                                                            onClick={() => fileDelete(menu.label)}
                                                                        >
                                                                            <X className="w-5 h-5" />
                                                                        </Button> */}
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
                                    />
                                    {
                                        iconHoverMenu &&
                                        <FolderPlus
                                            className="w-6 h-6 text-green-700 hover:text-green-400 ms-2 hover:cursor-pointer"
                                            onClick={() => fileCreate('')}
                                        />
                                    }

                                    {/* <Button
                                        variant="outline"
                                        className="w-[50px] justify-start font-normal bg-red-500 text-white hover:bg-red-600"
                                        onClick={() => fileDelete('')}
                                    >
                                        <X className="w-5 h-5" />
                                    </Button> */}
                                </div>
                            </div>
                            <div className="absolute bottom-1 left-4">
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
                    </ScrollArea>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default Sidebar;