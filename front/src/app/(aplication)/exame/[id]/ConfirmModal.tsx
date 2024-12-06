"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui";
import { Loader2 } from "lucide-react";

import { MouseEvent } from "react";

interface ConfirmModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleContinue: (e: MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
}

export function ConfirmModal({
  open,
  setOpen,
  handleContinue,
  loading,
}: ConfirmModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza de que deseja continuar?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita e excluirá sua consulta.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue} disabled={loading}>
            {loading && <Loader2 className="animate-spin" />}
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
