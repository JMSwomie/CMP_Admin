export const useRole = () => {
  const userRole = localStorage.getItem('role');
  return userRole;
};
