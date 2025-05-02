import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { JSX } from "preact/jsx-runtime";

interface IncrementerProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  count: Signal<number>;
}

export default function Incrementer(props: IncrementerProps) {
  const { count, ...rest } = props;
  return (
    <Button
      onClick={() => count.value += 2}
      {...rest}
      class="px-2 py-1 rounded bg-red-400 hover:bg-red-200 border border-red-300 border-top-red-400 transition-colors font-semibold"
    />
  );
}
