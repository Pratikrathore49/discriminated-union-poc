import type { UserState } from "../types/userState";

const userStates: Record<string, UserState> = {
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

export default userStates;
