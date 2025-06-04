export const createAuthenticated = (set: (fn: (state: any) => any) => void) => ({
  isAuthenticated: false,
  userData: null,
  setUserData: (user: any) => {
    set((state: any) => ({
      ...state,
      isAuthenticated: true,
      userData: user,
    }));
  },
});
