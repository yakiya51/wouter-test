import { useLocation } from "wouter";
import { useAuthRequired } from "../context";

export function HomePage() {
  const { session, logout } = useAuthRequired();
  const [_, setLocation] = useLocation();

  return (
    <main>
      <p>Logged in as {session.id}</p>
      <button
        onClick={() => {
          logout();
          setLocation("/");
        }}
      >
        Logout
      </button>
    </main>
  );
}
