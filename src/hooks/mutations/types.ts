import { DefaultError } from "@tanstack/react-query";

export type WithID<T> = { id: string } & T;
export type ReturnActionType<
  ActionType extends (...args: unknown[]) => unknown
> = Awaited<ReturnType<ActionType>>;

export type ParamsMutation<ActionType> = {
  onSuccess?: (data: ActionType) => void;
  onError?: (error: DefaultError) => void;
};
