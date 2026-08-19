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
     CHECK CURRENT SESSION
     
     Backend:
     GET /api/users/session
  ===================================================== */

  const checkSession = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();

      setUser(currentUser || null);

      return currentUser || null;
    } catch {
      /*
       * No active session.
       */

      setUser(null);

      return null;
    }
  }, []);

  /* =====================================================
     INITIAL AUTH CHECK
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const currentUser = await getCurrentUser();

        if (mounted) {
          setUser(currentUser || null);
        }
      } catch {
        if (mounted) {
          setUser(null);
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
  }, []);

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
       * Expected backend response:
       *
       * {
       *   user: {
       *     id,
       *     name,
       *     email
       *   }
       * }
       */

      const loggedInUser = response?.user || response?.data?.user || null;

      if (loggedInUser) {
        setUser(loggedInUser);
      } else {
        /*
         * If login doesn't return the user,
         * get it from the active session.
         */

        await checkSession();
      }

      return response;
    } catch (error) {
      setUser(null);

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
       * Backend logout can fail, but we still
       * clear the frontend authentication state.
       */

      console.error("Logout error:", error);
    } finally {
      setUser(null);
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
        setUser,
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
   EXPORT CONTEXT
===================================================== */

export { AuthContext };
