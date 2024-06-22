export const handleStatus = <T>(status: number, data: T | T[]) => {
  if (status === 200 || status === 201 || status === 204) {
    if (!data) {
      return;
    }
    if (Array.isArray(data)) {
      return data as T[];
    }
    return data as T;
  } else if (status === 500) {
    throw new Error("Internal server error");
  } else {
    return null;
  }
};
