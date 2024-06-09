'use client'

import { loadMenu } from "@/app/components/sidebar/loadMenu";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { useEffect, useState } from "react";
import Router from 'next/router'

import {
    Alert,
    AlertDescription,
    AlertTitle
} from "@/components/ui/alert"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link, Terminal } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";


export default function Page({ params }: any) {

    const [menu, setMenu] = useState<string[]>([]);

    let pages = params;

    useEffect(() => {
        loadMenu().then((menu: string[]) => {
            setMenu(menu);
        });

    }, []);

    console.log(menu)

    return (
        <>
            <ScrollArea className=" h-[calc(100vh-100px)] w-full p-4">
                <div className="w-full p-3 border">
                    <Breadcrumb className="ps-4">
                        <BreadcrumbList>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {pages.page}
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="w-full p-3">
                    {
                        menu.map((menu: any, i: any) => {

                            if (pages.page == menu.label) {
                                return (
                                    <div key={i}>
                                        <Alert className="w-full mb-4">
                                            <Terminal className="h-4 w-4" />
                                            <AlertTitle>{menu.label}</AlertTitle>
                                            <AlertDescription>
                                                {menu.link}
                                            </AlertDescription>
                                        </Alert>
                                        {
                                            menu.subMenu.map((submenu: any, i: any) => {
                                                return (
                                                    <div
                                                        key={i}
                                                        className="inline-flex m-3"
                                                    >
                                                        <Card
                                                            className="w-[250px] cursor-pointer"
                                                            onClick={function () {
                                                                if (!(typeof window === undefined)) {
                                                                    window.history.pushState(null, 'null', submenu.link);
                                                                    window.location.reload();
                                                                }
                                                            }}
                                                        >
                                                            <CardHeader>
                                                                <CardTitle>{submenu.label}</CardTitle>
                                                                <CardDescription>{submenu.link}</CardDescription>
                                                            </CardHeader>
                                                            {/* <CardContent>
                                                            <p>Card Content</p>
                                                        </CardContent>
                                                        <CardFooter>
                                                            <p>Card Footer</p>
                                                        </CardFooter> */}
                                                        </Card>
                                                    </div>
                                                )

                                            })
                                        }

                                    </div>
                                )
                            }
                        })
                    }
                </div >
            </ScrollArea>
        </>
    )
}