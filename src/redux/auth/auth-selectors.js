export const getIsAuthenticated = state => state.auth.isAuthorized;
export const getIsSignup = state => state.auth.isSignup;

export const getUserEmail = state => state.auth.user.email;

export const getLoadingUser = state => state.auth.loading;

export const getErrorSignup = state => state.auth.errorSignup;
export const getErrorLogin = state => state.auth.errorLogin;

export const getError = state => state.auth.error;

export const getStatusLoadingUser = state => state.auth.isLoadingUser;
