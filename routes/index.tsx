
import ProfileForm from "../islands/ProfileForm.tsx";
import Preview from "../islands/Preview.tsx";

export default function Home() {
  return (
    <div class="px-4 py-8 mx-auto h-screen flex justify-center">
      <div class="max-w-screen-md mx-auto flex flex-row items-center justify-center gap-4">
        <Preview />
        <div class="min-w-48">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}
