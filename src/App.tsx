import { useState } from "react";
import UserCard from "./components/UserCard";
import type { UserState } from "./types/userState";
import "./App.css";

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
    <div className="app">
      <header>
        <h1>TypeScript Discriminated Unions</h1>
        <p className="subtitle">
          One <code>UserState</code> type · Five safe states · Zero <code>any</code>
        </p>
      </header>

      {/* State switcher */}
      <nav className="tabs">
        {BUTTONS.map((key) => (
          <button
            key={key}
            className={`tab ${active === key ? "tab--active" : ""}`}
            onClick={() => setActive(key)}
          >
            {key}
          </button>
        ))}
      </nav>

      {/* Component renders a different UI for each state */}
      <main>
        <UserCard state={STATES[active]} />
      </main>

      {/* Show the raw type so viewers can see the shape */}
      <section className="type-box">
        <h3>Current state shape</h3>
        <pre>{JSON.stringify(STATES[active], null, 2)}</pre>
      </section>
    </div>
  );
}
