import { useState } from "react";
import UserCard from "./components/UserCard";
import type { UserState } from "./types/userState";

// One sample object per state — makes every branch easy to demo.
const STATES: Record<string, UserState> = {
  loading: { status: "loading" },

  success: {
    status: "success",
    user: { id: 1, name: "Jipra Singh", email: "jipra@example.com", role: "Frontend Dev" },
  },

  empty: {
    status: "empty",
    message: "No user found for the given ID.",
  },

  "validation-error": {
    status: "validation-error",
    fields: [
      { field: "email", message: "Must be a valid email address." },
      { field: "name", message: "Name cannot be empty." },
    ],
  },

  "server-error": {
    status: "server-error",
    code: 500,
    message: "Internal server error. Please try again later.",
  },
};

const BUTTONS = ["loading", "success", "empty", "validation-error", "server-error"] as const;

export default function App() {
  const [active, setActive] = useState<string>("loading");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center py-12 px-4">

      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          TypeScript Discriminated Unions
        </h1>
        <p className="mt-2 text-slate-400 text-sm">
          One <code className="bg-slate-800 text-sky-400 px-1.5 py-0.5 rounded text-xs">UserState</code> type
          &nbsp;·&nbsp; Five safe states &nbsp;·&nbsp; Zero{" "}
          <code className="bg-slate-800 text-sky-400 px-1.5 py-0.5 rounded text-xs">any</code>
        </p>
      </header>

      {/* State switcher tabs */}
      <nav className="flex flex-wrap justify-center gap-2 mb-8">
        {BUTTONS.map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer
              ${active === key
                ? "bg-sky-500 border-sky-500 text-white"
                : "bg-slate-800 border-slate-700 text-slate-400 hover:border-sky-400 hover:text-sky-400"
              }`}
          >
            {key}
          </button>
        ))}
      </nav>

      {/* Component renders a different UI per state */}
      <main className="w-full max-w-md">
        <UserCard state={STATES[active]} />
      </main>

      {/* Raw state shape */}
      <section className="w-full max-w-md mt-6 bg-slate-900 border border-slate-800 rounded-xl p-4">
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-medium">
          Current state shape
        </p>
        <pre className="text-xs text-sky-400 whitespace-pre-wrap break-words">
          {JSON.stringify(STATES[active], null, 2)}
        </pre>
      </section>
    </div>
  );
}
