import { Link, Route, Switch, useLocation } from "wouter";
import { HomePage } from "./pages/home";
import LoginPage from "./pages/login";
import type { PropsWithChildren } from "react";
import { useAuthRequired } from "./context";
import { Layout } from "./layout";

function Protected({ children }: PropsWithChildren) {
  useAuthRequired();
  return children;
}

export function Router() {
  const [location] = useLocation();
  return (
    <>
      <nav>
        {location == "/" && <Link href="/login">Login Page</Link>}
        {location == "/login" && <Link href="/">Home Page</Link>}
      </nav>
      <Switch>
        <Route path="/login" component={LoginPage} />

        <Protected>
          <Layout>
            <Switch>
              <Route path="/" component={HomePage} />
            </Switch>
          </Layout>
        </Protected>
      </Switch>
    </>
  );
}
