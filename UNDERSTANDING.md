# My Understanding — TypeScript Discriminated Unions

_Personal notes while building this POC._

---

## What is a discriminated union?

It is a TypeScript pattern where you combine multiple interfaces into one union type. Each interface has a shared property — called the **discriminant** — set to a unique string literal. TypeScript uses that literal to figure out which interface you are working with at any given point in the code.

```ts
type Shape =
  | { kind: "circle";    radius: number }
  | { kind: "rectangle"; width: number; height: number };
```

Here `kind` is the discriminant. When TypeScript sees `kind === "circle"` it automatically knows `radius` is available and `width`/`height` are not.

---

## Why I was confused at first

Before this POC I was managing UI state like this:

```ts
// ❌ Old way — boolean soup
const [isLoading, setIsLoading]   = useState(false);
const [user, setUser]             = useState<User | null>(null);
const [error, setError]           = useState<string | null>(null);
const [isEmpty, setIsEmpty]       = useState(false);
```

The problem: nothing stops you from having `isLoading = true` AND `error = "oops"` at the same time. That is an impossible state in reality but totally possible in code, which means bugs.

---

## The "aha" moment

A discriminated union makes impossible states **structurally impossible**:

```ts
// ✅ New way — one state at a time
type UserState =
  | { status: "loading" }
  | { status: "success"; user: User }
  | { status: "error";   message: string };
```

You can only ever be in **one** of these states. The `status` field is the single source of truth.

---

## How TypeScript narrowing works

```ts
function handle(state: UserState) {
  if (state.status === "success") {
    console.log(state.user.name); // ✅ TypeScript knows `user` exists
    console.log(state.message);   // ❌ compile error — `message` is not on SuccessState
  }
}
```

The check `state.status === "success"` tells TypeScript: "inside this block, the only possible type is `SuccessState`". It will not let you access properties that do not exist on that interface.

---

## The exhaustiveness check trick

```ts
switch (state.status) {
  case "loading":        return <Spinner />;
  case "success":        return <UserCard />;
  case "empty":          return <Empty />;
  case "validation-error": return <ValidationErrors />;
  case "server-error":   return <ServerError />;

  default:
    const _exhaustive: never = state; // 🛡 safety net
    return _exhaustive;
}
```

If I add a new state to `UserState` later — say `{ status: "unauthorized" }` — but forget to add a `case` for it here, TypeScript will show an error on the `_exhaustive` line. The build fails before any user sees a bug.

---

## What I learned about preventing bad patterns

| Bad pattern | Why it is bad | What I use instead |
|---|---|---|
| `any` | Opts out of type checking entirely | Proper union types |
| `as SomeType` | Forces TypeScript to trust you, hides real errors | Let TypeScript narrow naturally |
| `state.user!.name` | `!` asserts non-null, can crash at runtime | Handle the `null` case in the type |
| `isLoading && isError` | Two flags can both be `true` — invalid state | One `status` literal, only one state at a time |
| Missing `default` in switch | New states silently fall through | `never` exhaustiveness check |

---

## Real-world use cases I can apply this to

- **API responses** — loading / success / error / empty / paginating
- **Form submissions** — idle / submitting / submitted / failed
- **Auth flows** — unauthenticated / authenticating / authenticated / expired
- **File uploads** — idle / uploading / processing / done / failed
- **WebSocket connections** — connecting / connected / disconnected / error

Any time there are multiple exclusive states, a discriminated union is a better model than a collection of booleans or nullable fields.

---

## The one-sentence summary

> A discriminated union is a way to tell TypeScript "this value is exactly **one** of these shapes, and here is how you tell them apart" — so the compiler, not the runtime, catches every mistake.
