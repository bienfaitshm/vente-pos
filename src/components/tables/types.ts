import type { IEditDeleteActions } from "./actions/table-actions";

export type ColumnParamsWithAction<T> = { actions?: IEditDeleteActions<T> };
