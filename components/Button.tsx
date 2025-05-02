import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
    disabled={!IS_BROWSER || props.disabled}
    class="px-2 py-1 border-blue-500 border-2 rounded bg-blue-400 hover:bg-blue-200 transition-colors"
    {...props}
    />
  );
}
