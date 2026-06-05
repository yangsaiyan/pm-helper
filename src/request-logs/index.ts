export const REQUEST_LOG_METHOD = {
  GET: 0,
  POST: 1,
  PUT: 2,
  PATCH: 3,
  DELETE: 4,
} as const;

export const REQUEST_LOG_METHOD_LABEL = {
  [REQUEST_LOG_METHOD.GET]: "GET",
  [REQUEST_LOG_METHOD.POST]: "POST",
  [REQUEST_LOG_METHOD.PUT]: "PUT",
  [REQUEST_LOG_METHOD.PATCH]: "PATCH",
  [REQUEST_LOG_METHOD.DELETE]: "DELETE",
} as const;

export const getRequestLogMethodLabel = (value: number) =>
  REQUEST_LOG_METHOD_LABEL[value as keyof typeof REQUEST_LOG_METHOD_LABEL];
