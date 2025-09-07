import type { PropsWithChildren } from "react";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="">
      <p>this is in a layout</p>
      <div className="">{children}</div>
    </div>
  );
}
