import { JSX } from "preact/jsx-runtime";

interface ProfileFormProps extends JSX.HTMLAttributes<HTMLFormElement> {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export default (props: ProfileFormProps) => {
  const {firstName, lastName, email, ...rest} = props
  return (
    <form
      class="flex flex-col gap-2 items-start"
      method="POST"
      action="/preview"
      {...rest}
    >
      <label class="input">
        First Name<input type="text" name="firstName" value={firstName ?? ''} />
      </label>
      <label class="input">
        Last Name<input type="text" name="lastName" value={lastName ?? ''}  />
      </label>
      <label class="input">
        Email<input type="email" name="email" value={email ?? ''}  />
      </label>
      <button class="btn btn-primary" type="submit">Save</button>
    </form>
  );
};
