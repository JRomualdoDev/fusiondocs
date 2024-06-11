'use client'

import { loadMenu } from "@/app/components/sidebar/loadMenu";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import {
    Alert,
    AlertDescription,
    AlertTitle
} from "@/components/ui/alert"

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link, Terminal } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";


export default function Page({ params }: any) {

    const [menu, setMenu] = useState<string[]>([]);

    const router = useRouter();

    let pages = params;

    useEffect(() => {
        loadMenu().then((menu: string[]) => {
            setMenu(menu);
        });
    }, []);

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
                                                        className="inline-flex m-2 "
                                                        onClick={() => router.push(submenu.link)}
                                                    >
                                                        <Card
                                                            className="w-[250px] cursor-pointer hover:bg-slate-300/20"

                                                        // onClick={function () {
                                                        //     if (!(typeof window === undefined)) {
                                                        //         window.history.pushState(null, 'null', submenu.link);
                                                        //         window.location.reload();
                                                        //     }
                                                        // }}
                                                        // href={submenu.link}
                                                        >
                                                            <CardHeader>
                                                                <CardTitle className="text-ellipsis overflow-hidden">{submenu.label}</CardTitle>
                                                                <CardDescription className="text-ellipsis overflow-hidden">{submenu.link}</CardDescription>
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