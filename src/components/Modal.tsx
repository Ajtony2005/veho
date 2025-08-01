import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";

interface ModalProps {
  message: string;
  onClose: () => void;
}

function Modal({ message, onClose }: ModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="card max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-foreground">
            {message.includes("Sikeres") || message.includes("successful")
              ? "Siker"
              : "Hiba"}
          </DialogTitle>
        </DialogHeader>
        <div className="p-4 text-center">
          <p
            className={
              message.includes("Sikeres") || message.includes("successful")
                ? "text-secondary"
                : "text-destructive"
            }
          >
            {message}
          </p>
        </div>
        <div className="flex justify-center">
          <Button onClick={onClose} className="btn-primary">
            Bezárás
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
