/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { getCurrentUser, loginUser, logoutUser } from "../services/authService";

/* =====================================================
   STORAGE KEY
===================================================== */

const AUTH_USER_KEY = "jigyasa_user";

/* =====================================================
   AUTH CONTEXT
===================================================== */

const AuthContext = createContext(null);

/* =====================================================
   AUTH PROVIDER
===================================================== */

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =====================================================
     SAVE USER
  ===================================================== */

  const saveUser = useCallback((userData) => {
    if (!userData) {
      return;
    }

    setUser(userData);

    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
  }, []);

  /* =====================================================
     CLEAR USER
  ===================================================== */

  const clearUser = useCallback(() => {
    setUser(null);

    localStorage.removeItem(AUTH_USER_KEY);
  }, []);

  /* =====================================================
     GET STORED USER
  ===================================================== */

  const getStoredUser = useCallback(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_USER_KEY);

      if (!storedUser) {
        return null;
      }

      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Unable to read stored user:", error);

      localStorage.removeItem(AUTH_USER_KEY);

      return null;
    }
  }, []);

  /* =====================================================
     CHECK SESSION
  ===================================================== */

  const checkSession = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();

      /*
       * Backend session exists.
       */
      if (currentUser) {
        saveUser(currentUser);

        return currentUser;
      }

      /*
       * Backend returned:
       *
       * {
       *   "user": null
       * }
       *
       * Use the frontend-persisted user.
       */
      const storedUser = getStoredUser();

      if (storedUser) {
        setUser(storedUser);

        return storedUser;
      }

      /*
       * No backend session
       * and no stored frontend user.
       */
      clearUser();

      return null;
    } catch (error) {
      /*
       * If the session request fails,
       * still try the stored frontend user.
       */

      console.error("Session check failed:", error);

      const storedUser = getStoredUser();

      if (storedUser) {
        setUser(storedUser);

        return storedUser;
      }

      clearUser();

      return null;
    }
  }, [clearUser, getStoredUser, saveUser]);

  /* =====================================================
     INITIAL AUTH CHECK
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        /*
         * First check localStorage immediately.
         *
         * This prevents the dashboard from disappearing
         * during page refresh.
         */

        const storedUser = getStoredUser();

        if (storedUser && mounted) {
          setUser(storedUser);
        }

        /*
         * Then verify the backend session.
         */

        const currentUser = await getCurrentUser();

        if (!mounted) {
          return;
        }

        if (currentUser) {
          /*
           * Backend session is valid.
           */
          saveUser(currentUser);
        } else if (storedUser) {
          /*
           * Backend says user:null,
           * but we have a valid frontend login state.
           */
          setUser(storedUser);
        } else {
          /*
           * Completely logged out.
           */
          clearUser();
        }
      } catch (error) {
        if (!mounted) {
          return;
        }

        console.error("Authentication initialization failed:", error);

        /*
         * If backend session cannot be checked,
         * use stored login state.
         */
        const storedUser = getStoredUser();

        if (storedUser) {
          setUser(storedUser);
        } else {
          clearUser();
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, [clearUser, getStoredUser, saveUser]);

  /* =====================================================
     LOGIN
  ===================================================== */

  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await loginUser({
        email,
        password,
      });

      /*
       * Support multiple possible response structures.
       */

      const loggedInUser =
        response?.user || response?.data?.user || response?.data || null;

      /*
       * If login response contains the user,
       * save it immediately.
       */

      if (
        loggedInUser &&
        typeof loggedInUser === "object" &&
        !Array.isArray(loggedInUser)
      ) {
        saveUser(loggedInUser);

        return response;
      }

      /*
       * If login does not return user data,
       * try the backend session.
       */

      const sessionUser = await getCurrentUser();

      if (sessionUser) {
        saveUser(sessionUser);

        return response;
      }

      /*
       * If backend session is also null,
       * don't pretend login succeeded without user data.
       */

      throw new Error("Login succeeded, but no user information was returned.");
    } catch (error) {
      clearUser();

      throw error;
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      /*
       * Backend logout failure should not prevent
       * frontend logout.
       */

      console.error("Logout error:", error);
    } finally {
      clearUser();
    }
  };

  /* =====================================================
     REFRESH USER
  ===================================================== */

  const refreshUser = async () => {
    setLoading(true);

    try {
      return await checkSession();
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     AUTHENTICATION STATUS
  ===================================================== */

  const isAuthenticated = Boolean(user);

  /* =====================================================
     PROVIDER
  ===================================================== */

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: saveUser,
        loading,
        isAuthenticated,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =====================================================
   USE AUTH
===================================================== */

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}

/* =====================================================
   CONTEXT EXPORT
===================================================== */

export { AuthContext };
