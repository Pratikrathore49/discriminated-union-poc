import type { UserState } from "../types/userState";

interface Props {
  state: UserState;
}

// TypeScript narrows the union inside each case — no `any`, no unsafe access.
export default function UserCard({ state }: Props) {
  switch (state.status) {

    case "loading":
      return (
        <div className="flex flex-col items-center justify-center gap-3 bg-slate-800 border border-slate-700 rounded-2xl p-10 min-h-40">
          <div className="w-9 h-9 rounded-full border-4 border-slate-600 border-t-sky-400 animate-spin" />
          <p className="text-slate-400 text-sm">Loading user data…</p>
        </div>
      );

    case "success":
      return (
        <div className="flex flex-col items-center gap-3 bg-emerald-950 border border-emerald-800 rounded-2xl p-8">
          <div className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center text-white text-2xl font-bold">
            {state.user.name[0].toUpperCase()}
          </div>
          <h2 className="text-emerald-300 text-xl font-semibold">{state.user.name}</h2>
          <p className="text-slate-400 text-sm">{state.user.email}</p>
          <span className="bg-emerald-900 text-emerald-400 border border-emerald-700 px-3 py-0.5 rounded-full text-xs font-semibold">
            {state.user.role}
          </span>
        </div>
      );

    case "empty":
      return (
        <div className="flex flex-col items-center justify-center gap-3 bg-violet-950 border border-violet-800 rounded-2xl p-10 min-h-40">
          <span className="text-4xl">📭</span>
          <p className="text-violet-300 text-sm">{state.message}</p>
        </div>
      );

    case "validation-error":
      return (
        <div className="bg-red-950 border border-red-800 rounded-2xl p-6">
          <h3 className="text-red-300 font-semibold mb-3">⚠ Validation Errors</h3>
          <ul className="flex flex-col gap-2">
            {state.fields.map((f) => (
              <li key={f.field} className="text-red-400 text-sm">
                <span className="font-semibold">{f.field}:</span> {f.message}
              </li>
            ))}
          </ul>
        </div>
      );

    case "server-error":
      return (
        <div className="bg-red-950 border border-red-800 rounded-2xl p-6">
          <h3 className="text-red-300 font-semibold mb-2">🔴 Server Error {state.code}</h3>
          <p className="text-red-400 text-sm">{state.message}</p>
        </div>
      );

    default:
      // Exhaustiveness check — TypeScript will error here if a case is missing.
      const _exhaustive: never = state;
      return _exhaustive;
  }
}
