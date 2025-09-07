import { useState } from "react";
import { useAuth } from "../context";
import { useLocation } from "wouter";

function LoginPage() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [_, setLocation] = useLocation();
  return (
    <main>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          login(name);
          setLocation("/protected");
        }}
      >
        <input type="text" required onChange={(e) => setName(e.target.value)} />
        <button>Login</button>
      </form>
    </main>
  );
}

export default LoginPage;
