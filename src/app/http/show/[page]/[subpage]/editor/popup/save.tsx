import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function AlertDialogDemo() {
    return (
        <AlertDialog open={true} onOpenChange={() => { }}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Salvamento automático do documento.</AlertDialogTitle>
                    <AlertDialogDescription>
                        Documento em processo de salvamento.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
