export default function Page(params: unknown) {
  return (
    <div>
      <h1>{JSON.stringify(params, null, 4)}</h1>
    </div>
  );
}
