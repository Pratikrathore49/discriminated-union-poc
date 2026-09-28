# TypeScript Discriminated Unions — POC

> **Tech stack:** React 18 · TypeScript · Vite

---

## What this POC demonstrates

A single React component (`UserCard`) that renders five completely different UI states — all driven by one TypeScript **discriminated union** type. TypeScript narrows the exact state inside every branch, so you get compile-time safety with zero `any` and no unsafe property access.

---

## The five states

| Status | What it shows |
|---|---|
| `loading` | Spinner while data is being fetched |
| `success` | User name, email, and role |
| `empty` | Friendly "nothing found" message |
| `validation-error` | List of field-level validation messages |
| `server-error` | HTTP error code + message |

---

## Project structure

```
src/
├── types/
│   └── userState.ts      ← all five state interfaces + the union
├── components/
│   └── UserCard.tsx      ← one component, switch on status
├── App.tsx               ← tab switcher to demo every state
└── App.css               ← dark-theme styles
```

---

## Core type definition

```ts
// Every interface shares the `status` property — that is the discriminant.

export interface LoadingState         { status: "loading" }
export interface SuccessState         { status: "success";          user: { ... } }
export interface EmptyState           { status: "empty";            message: string }
export interface ValidationErrorState { status: "validation-error"; fields: { field: string; message: string }[] }
export interface ServerErrorState     { status: "server-error";     code: number; message: string }

export type UserState =
  | LoadingState
  | SuccessState
  | EmptyState
  | ValidationErrorState
  | ServerErrorState;
```

---

## How the component uses it

```tsx
function UserCard({ state }: { state: UserState }) {
  switch (state.status) {
    case "success":
      return <div>{state.user.name}</div>;   // ✅ TypeScript knows `user` exists here

    case "server-error":
      return <div>{state.code}</div>;        // ✅ TypeScript knows `code` exists here

    default:
      const _exhaustive: never = state;      // 🛡 compile error if a case is missed
      return _exhaustive;
  }
}
```

TypeScript **narrows** the union at each `case`. If you try to access `state.user` in the `server-error` branch, the compiler will error — not the browser at runtime.

---

## Problems this pattern solves

| Problem | Without discriminated unions | With discriminated unions |
|---|---|---|
| Unsafe property access | `data.user?.name` everywhere, easy to miss | Compiler guarantees the property exists in that branch |
| Invalid state combinations | `isLoading && hasError && hasData` all true at once | Structurally impossible — only one status at a time |
| Repeated null checks | Scattered `if (x !== null)` throughout JSX | One switch, each branch has exactly what it needs |
| Runtime surprises | `Cannot read properties of undefined` | Caught at compile time |
| Scaling to new states | Add a flag, update every `if` chain | Add one interface, TypeScript shows every unhandled `case` |

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and click the tabs to switch between states.

---

## Key takeaways

1. The `status` string literal is the **discriminant** — it is the only property guaranteed to exist on every member of the union.
2. A `switch` on the discriminant gives TypeScript enough information to **narrow** to the exact interface in each branch.
3. The `never` exhaustiveness check at the bottom of the `switch` is a compile-time guard — add a new state to the union without handling it and the build fails.
4. No `any`, no type assertions (`as`), no optional chaining used as a workaround.
