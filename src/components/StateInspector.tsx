import type { UserState } from "../types/userState";

interface Props {
  state: UserState;
}

export default function StateInspector({ state }: Props) {
  return (
    <section className="w-full max-w-md mt-6 bg-slate-900 border border-slate-800 rounded-xl p-4">
      <p className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-medium">
        Current state shape
      </p>
      <pre className="text-xs text-sky-400 whitespace-pre-wrap break-words">
        {JSON.stringify(state, null, 2)}
      </pre>
    </section>
  );
}
