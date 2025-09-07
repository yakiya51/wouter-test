import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { useLocation } from "wouter";

interface Session {
  id: string;
}

interface UseAuthReturn {
  session: Session | null;
  login: (sessionId: string) => void;
  logout: () => void;
}

interface UseAuthRequiredReturn {
  session: Session;
  login: (sessionId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<UseAuthReturn | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);

  const value: UseAuthReturn = {
    session: session,
    login: (input) => setSession({ id: input }),
    logout: () => setSession(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): UseAuthReturn {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useAuthRequired(): UseAuthRequiredReturn {
  console.log("useAuthRequired");
  const [location, setLocation] = useLocation();
  const auth = useAuth();

  useEffect(() => {
    if (auth.session === null && location !== "/login") {
      console.log("going to /login");
      setLocation(`/login`);
    }
  }, [auth, location]);

  if (!auth.session) {
    return { ...auth, session: { id: "" } };
  }

  return auth as UseAuthRequiredReturn;
}
