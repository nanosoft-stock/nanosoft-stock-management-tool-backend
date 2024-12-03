export const printDebugError = (error): void => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
};
