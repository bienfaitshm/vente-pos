import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Menus {
  name: string;
  action(): void;
  shortcut?: React.ReactElement;
  separator?: boolean;
}

export interface MoreDropMenuProps {
  menus?: Menus[];
}

export const MoreDropMenu: React.FC<MoreDropMenuProps> = ({ menus = [] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-6 w-6 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {menus.map((menu, index) => (
          <>
            <DropdownMenuItem key={index} onSelect={menu.action}>
              {menu.name}
              {menu.shortcut && (
                <DropdownMenuShortcut>{menu.shortcut}</DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
            {menu.separator && <DropdownMenuSeparator />}
          </>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
