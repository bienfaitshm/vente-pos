import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

export const AddCategoryDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <PlusCircle />
          <span>Ajouter</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Category</DialogTitle>
          <DialogDescription>Ajouts de la category</DialogDescription>
        </DialogHeader>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
            mollitia, id, error optio fuga aliquid sed nisi aliquam numquam
            dolores modi officiis laboriosam aperiam molestias est nesciunt
            reiciendis blanditiis illo!
          </p>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Terminer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
