import type { ComponentPropsWithoutRef } from "react";

export const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => <h1 {...props} />,
  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 {...props} />,
  p: (props: ComponentPropsWithoutRef<"p">) => <p {...props} />,
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      {...props}
      className="font-black underline decoration-signal-red decoration-2 underline-offset-4"
    />
  ),
};
