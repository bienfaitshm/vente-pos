import type { Row } from "@tanstack/react-table";
import type { Menus } from "../more-drop-menu";
import type { IEditDeleteActions } from "./actions/table-actions";

export type ColumnParamsWithAction<T> = { actions?: IEditDeleteActions<T> };
export type TableRowMenu<T> = Menus & { action(row: Row<T>): void };
