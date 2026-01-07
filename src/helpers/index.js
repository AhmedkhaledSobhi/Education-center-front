function hasEmptyValue(obj) {
  return Object.values(obj).some(
    (val) =>
      val === null ||
      val === undefined ||
      val === "" ||
      (typeof val === "object" && Object.keys(val).length === 0)
  );
}

export {
  hasEmptyValue,
}