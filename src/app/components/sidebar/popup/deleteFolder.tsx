'use client'

import { Button } from "@/components/ui/button"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export function PopupDeleteFolder({ open, close, popupDelFolder, menuName }: any) {
    return (
        <>
            <Dialog open={open} onOpenChange={close}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tem certeza que deseja excluir a pasta
                            {<span className="font-bold uppercase text-red-600"> {menuName} </span>}
                            ?</DialogTitle>
                        <DialogDescription>
                            Está ação não pode ser refeita. Você tem certeza que deseja apagar esta pasta
                            permanentemente do servidor?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            onClick={popupDelFolder}
                        >Confirmar
                        </Button>
                        <Button
                            onClick={close}
                        >Cancelar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}
