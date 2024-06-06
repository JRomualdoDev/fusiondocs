'use client'

import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export function PopupDeleteFile({ open, close, popupDelFile, fileName }: any) {
    return (
        <>
            <Dialog open={open} onOpenChange={close}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tem certeza que deseja excluir este arquivo
                            {<span className="font-bold uppercase text-red-600"> {fileName} </span>}
                            ?</DialogTitle>
                        <DialogDescription>
                            Está ação não pode ser refeita. Você tem certeza que deseja apagar esta pasta
                            permanentemente do servidor?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            onClick={popupDelFile}
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
