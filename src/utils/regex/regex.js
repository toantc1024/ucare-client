export const passwordCheckPattern = (password) => {
  let pattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  let result = pattern.test(password);
  return result;
};
