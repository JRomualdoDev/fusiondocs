"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { file } from "./file";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProps } from "./sidebar";
import { useState } from "react";

import {
    FileText,
    Check,
    X,

} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"




function Sidebar({ className, menus }: SidebarProps) {

    const [itemMenu, setItemMenu] = useState("");
    const [subItemMenu, setSubItemMenu] = useState("");
    
    function fileCreate(menuLabel: string) {

        let newSubItemMenu = '';
        let tempItemMenu ='';

        // Passar o nome do item para o menu
        if(itemMenu === '') {
            tempItemMenu = menuLabel;
        }
        else {
            tempItemMenu = itemMenu;
        }

        if(subItemMenu !== '') {
            // Inserir o novo item no submenu
            // newSubItemMenu = `{
            //     label: "${subItemMenu}",
            //     link: "/${itemMenu}/${subItemMenu}",
            // },`;
            newSubItemMenu = subItemMenu;
        }

        file(tempItemMenu , newSubItemMenu, 'create').then(data => console.log(data));
    }

    function fileDelete(menuLabel: string) {
        let newSubItemMenu = '';
        let tempItemMenu = '';

        // Passar o nome do item para o menu
        if(itemMenu === '') {
            tempItemMenu = menuLabel;
        }
        else {
            tempItemMenu = itemMenu;
        }

        if(subItemMenu !== '') {
            newSubItemMenu = subItemMenu;
        }

        console.log(tempItemMenu)
        console.log(newSubItemMenu)
        file(tempItemMenu , newSubItemMenu, 'delete').then(data => console.log(data));
    }

    function handleSubItemMenu(event: React.ChangeEvent<HTMLInputElement>) {
        setSubItemMenu(event.target.value);
    }

    function handleItemMenu(event: React.ChangeEvent<HTMLInputElement>) {
        setItemMenu(event.target.value);
        setSubItemMenu('');
    }

    const pathname = usePathname()
    return (
        <div className="flex flex-col space-y-2 w-[260px] border bg-background">
            {/* <div className={cn("pb-12", className)}> */}
            <div className="space-y-4 pb-2">
                <div className="py-2">
                    <ScrollArea className="min-h-[300px] max-h-screen px-2">
                        <div className="space-y-1 p-2 h-[calc(100vh-28px)]">
                            {/* <Link
                                className={`${buttonVariants({
                                size: "sm",
                                variant: pathname === "/dashboard" ? "default" : "ghost",
                                //align: "flexLeft",
                                })}`}
                                href={"/dashboard"}
                            >
                                <span className="inline-flex items-center justify-center gap-1">
                                <FileText className="w-4 h-4" /> Dashboard
                                </span>
                            </Link> */}
                            <div className="mb-8">
                                <span>Logo</span>
                            </div>
                            {menus?.map((menu, i) => {
                                // if (menu.isParent === false && menu.link === "javascript:;" && menu.icon === undefined) {
                                if (menu.isParent === false && menu.link === "javascript:;") {
                                return <strong 
                                        key={`${menu}-${i}`} 
                                        className="font-bold inline-flex items-start justify-start text-xs text-gray-700 dark:text-gray-400"
                                    >{menu.label}
                                    </strong>
                                // } else if (menu.isParent && menu.link !== "javascript::" && menu.icon !== undefined) {
                                } else if (menu.isParent && menu.link !== "javascript::") {
                                return (
                                    <Accordion
                                    key={`${menu}-${i}`}
                                    type="single"
                                    collapsible
                                    // onValueChange={(value)=>{
                                    //     setItemMenu(menu.label)
                                    //     console.log(menu.label)
                                    // }}
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
                                        <span className="inline-flex  gap-1">
                                            {/* {menu.icon} {menu.label} */}
                                            <FileText className="w-4 h-4"/> {menu.label}
                                        </span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                        {menu.subMenu?.map((subItem, subIndex) => (
                                            <Button
                                                key={`${subIndex}-${i}`}
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start font-normal"
                                            >
                                            &mdash; {subItem.label}
                                            </Button>
                                        ))}
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <h3 className="pe-4">Sub Menu</h3>
                                            <div className="inline-flex gap-1 px-2 items-center">
                                                <Input 
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
                                                    onClick={()=>fileDelete(menu.label)}
                                                >
                                                    <X className="w-5 h-5" />
                                                </Button>
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
                                            <FileText  className="w-4 h-4"/> {menu.label}
                                        </span>
                                    </Link>
                                )
                                }
                            })}

                            <div className="flex flex-col items-center justify-center gap-2">
                                <h3 className="pe-4">Item Menu</h3>
                                <div className="inline-flex gap-1 px-2 items-center">
                                    <Input 
                                        className="w-[40px]} h-8"
                                        onChange={handleItemMenu}
                                    />
                                    <Button
                                        variant="outline"
                                        className="w-[50px] justify-start font-normal bg-green-500 text-white hover:bg-green-600"
                                        onClick={() => fileCreate('')}
                                    >
                                    <Check className="w-8 h-8" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-[50px] justify-start font-normal bg-red-500 text-white hover:bg-red-600"
                                        onClick={() => fileDelete('')}
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>
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