import { JSX } from "preact/jsx-runtime";
import type { Signal } from "@preact/signals";

interface PreviewProps {
  firstName: Signal<string>;
  lastName: Signal<string>;
  email: Signal<string>;
}

export default (props: PreviewProps) => {
  return (
    <div>
      <div class="rounded border border-gray-600 h-60 min-w-48">
        <div>{props.firstName.value}</div>
        <div>{props.lastName.value}</div>
        <div>{props.email.value}</div>
      </div>
    </div>
  );
};
