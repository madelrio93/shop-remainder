import { ClerkAPIResponseError } from "@clerk/shared/error";

export type ClerkInputFieldErrorTypes = {
  email_address: string;
  password: string;
};

export const clerkErrorMapping = (
  err: ClerkAPIResponseError
): { [key in keyof ClerkInputFieldErrorTypes]: string } => {
  const errors = {} as ClerkInputFieldErrorTypes;

  for (const key in err.errors) {
    const error = err.errors[key];
    const paramName = error.meta?.paramName as keyof ClerkInputFieldErrorTypes;

    errors[paramName] = error.longMessage || "";
  }

  return errors;
};
