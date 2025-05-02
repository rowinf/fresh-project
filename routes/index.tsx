import { useSignal } from "@preact/signals";
import ProfileForm from "../islands/ProfileForm.tsx";
import Preview from "../islands/Preview.tsx";

export default function Home() {
  const firstName = useSignal("");
  const lastName = useSignal("");
  const email = useSignal("");
  return (
    <div class="px-4 py-8 mx-auto bg-gray-100 h-screen flex justify-center">
      <div class="max-w-screen-md mx-auto flex flex-row items-center justify-center gap-4">
        <Preview firstName={firstName} lastName={lastName} email={email} />
        <div class="min-w-48">
          <ProfileForm firstName={firstName} lastName={lastName} email={email} />
        </div>
      </div>
    </div>
  );
}
