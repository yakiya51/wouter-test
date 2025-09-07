import { useEffect, useState } from "react";
import { useAuth } from "../context";
import { useLocation } from "wouter";

function LoginPage() {
  const { session, login } = useAuth();

  const [name, setName] = useState("");
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (session !== null) {
      setLocation("/");
    }
  }, [session]);

  return (
    <main>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          login(name);
          setLocation("/");
        }}
      >
        <input type="text" required onChange={(e) => setName(e.target.value)} />
        <button>Login</button>
      </form>
    </main>
  );
}

export default LoginPage;
