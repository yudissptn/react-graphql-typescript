import { AdminError, CustomerError, FieldError, OrderError } from "../generated/graphql";

export const toErrorMap = (errors: (OrderError | FieldError | CustomerError | AdminError)[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
