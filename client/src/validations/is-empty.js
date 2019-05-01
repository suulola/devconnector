const isEmpty = data =>
  data === "" ||
  data === null ||
  (typeof data === "object" && Object.keys(data).length === 0) ||
  (typeof data === "string" && data.trim().length === 0);

export default isEmpty;
