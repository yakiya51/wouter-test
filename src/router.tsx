import { Route, Switch, useLocation } from "wouter";
import { ProtectedPage } from "./pages/protected";
import LoginPage from "./pages/login";
import type { PropsWithChildren } from "react";
import { useAuth, useAuthRequired } from "./context";

function Protected({ children }: PropsWithChildren) {
  useAuthRequired();
  console.log("CHECKING AUTH STATE");
  return children;
}

export function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Protected>
        <Route path="/protected" component={ProtectedPage} />
      </Protected>
    </Switch>
  );
}
