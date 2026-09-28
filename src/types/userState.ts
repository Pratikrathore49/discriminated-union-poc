// ─────────────────────────────────────────────────────────────────────────────
// Each state is its own type with a unique "status" literal.
// TypeScript uses that literal to narrow the union inside if/switch blocks.
// ─────────────────────────────────────────────────────────────────────────────

export interface LoadingState {
  status: "loading";
}

export interface SuccessState {
  status: "success";
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export interface EmptyState {
  status: "empty";
  message: string;
}

export interface ValidationErrorState {
  status: "validation-error";
  fields: { field: string; message: string }[];
}

export interface ServerErrorState {
  status: "server-error";
  code: number;
  message: string;
}

// The discriminated union — one type, five possibilities.
export type UserState =
  | LoadingState
  | SuccessState
  | EmptyState
  | ValidationErrorState
  | ServerErrorState;
