import type { Row } from "@tanstack/react-table";
import type { TableRowMenu } from "../types";
import type { Menus } from "@/components/more-drop-menu";

export function makeMenus<T>(row: Row<T>, menus: TableRowMenu<T>[]): Menus[] {
  return menus.map((menu) => ({
    ...menu,
    action() {
      menu.action(row);
    },
  }));
}
