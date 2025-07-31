import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface ModalProps {
  message: string;
  onClose: () => void;
}

function Modal({ message, onClose }: ModalProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Hiba</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <img src="/nope.png" alt="Error" className="w-16 h-16" />
          <p className="text-gray-600 dark:text-gray-300">{message}</p>
        </div>
        <DialogFooter>
          <Button
            onClick={onClose}
            className="bg-indigo-500 text-white hover:bg-indigo-600"
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
