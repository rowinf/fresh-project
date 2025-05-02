import { JSX } from "preact/jsx-runtime";
import type { Signal } from "@preact/signals";

interface ProfileFormProps extends JSX.HTMLAttributes<HTMLFormElement> {
  firstName: Signal<string>;
  lastName: Signal<string>;
  email: Signal<string>;
}

export default (props: ProfileFormProps) => {
  return (
    <form
      class="flex flex-col gap-2 items-start"
      onSubmit={(event) => {
        event.preventDefault();
        const values = new FormData(event.currentTarget);
        props.firstName.value = String(values.get("firstName") ?? '');
        props.lastName.value = String(values.get("lastName") ?? '');
        props.email.value = String(values.get("email") ?? '');
      }}
    >
      <label class="input">
        First Name<input type="text" name="firstName" />
      </label>
      <label class="input">
        Last Name<input type="text" name="lastName" />
      </label>
      <label class="input">
        Email<input type="email" name="email" />
      </label>
      <button class="btn btn-primary" type="submit">Save</button>
    </form>
  );
};
