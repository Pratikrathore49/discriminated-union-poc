export default function PageHeader() {
  return (
    <header className="text-center mb-8">
      <h1 className="text-3xl font-bold text-white tracking-tight">
        TypeScript Discriminated Unions
      </h1>
      <p className="mt-2 text-slate-400 text-sm">
        One{" "}
        <code className="bg-slate-800 text-sky-400 px-1.5 py-0.5 rounded text-xs">
          UserState
        </code>{" "}
        type &nbsp;·&nbsp; Five safe states &nbsp;·&nbsp; Zero{" "}
        <code className="bg-slate-800 text-sky-400 px-1.5 py-0.5 rounded text-xs">
          any
        </code>
      </p>
    </header>
  );
}
