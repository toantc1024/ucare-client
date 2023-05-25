const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};
