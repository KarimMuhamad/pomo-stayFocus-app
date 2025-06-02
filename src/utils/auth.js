export const getAuthToken = () => {
  return {
    accessToken: localStorage.getItem("accessToken")
  }
}

export const setAuthToken = (token) => {
  localStorage.setItem('accessToken', token);
};

export const clearAuthToken = () => {
  localStorage.removeItem('accessToken');
};


export const logoutUser = () => {
  clearAuthToken();
  // optional: redirect ke halaman login
  window.location.href = '/login';
};