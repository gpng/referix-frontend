export const isSuccess = res => {
  if (res.error) {
    return false;
  }
  return true;
};
