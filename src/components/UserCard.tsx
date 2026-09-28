import type { UserState } from "../types/userState";

interface Props {
  state: UserState;
}

// TypeScript narrows the union inside each case — no `any`, no unsafe access.
export default function UserCard({ state }: Props) {
  switch (state.status) {
    case "loading":
      return (
        <div className="card card--loading">
          <div className="spinner" />
          <p>Loading user data…</p>
        </div>
      );

    case "success":
      return (
        <div className="card card--success">
          <div className="avatar">{state.user.name[0].toUpperCase()}</div>
          <h2>{state.user.name}</h2>
          <p className="email">{state.user.email}</p>
          <span className="badge">{state.user.role}</span>
        </div>
      );

    case "empty":
      return (
        <div className="card card--empty">
          <span className="icon">📭</span>
          <p>{state.message}</p>
        </div>
      );

    case "validation-error":
      return (
        <div className="card card--error">
          <h3>⚠ Validation Errors</h3>
          <ul>
            {state.fields.map((f) => (
              <li key={f.field}>
                <strong>{f.field}:</strong> {f.message}
              </li>
            ))}
          </ul>
        </div>
      );

    case "server-error":
      return (
        <div className="card card--error">
          <h3>🔴 Server Error {state.code}</h3>
          <p>{state.message}</p>
        </div>
      );

    default:
      // Exhaustiveness check — TypeScript will error here if a case is missing.
      const _exhaustive: never = state;
      return _exhaustive;
  }
}
