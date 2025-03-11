export type PageProps<TParams = unknown, TSearchParams = unknown> = {
  params: Promise<TParams>;
  searchParams: Promise<TSearchParams>;
};
