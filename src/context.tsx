import {
  createContext,
  useContext,
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
  const [location, setLocation] = useLocation();
  const auth = useAuth();

  if (auth.session === null) {
    setLocation(`/login?redirect=${encodeURIComponent(location)}`);
    return { ...auth, session: { id: "" } };
  }

  return auth as UseAuthRequiredReturn;
}
