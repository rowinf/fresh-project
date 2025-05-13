import { DeveloperSchema, writeDevItem } from "../services/sqlite.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Preview from "../components/Profile.tsx";
import ProfileForm from "../components/ProfileForm.tsx";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const [err, dev] = writeDevItem(null, {
      firstName: form.get("firstName")?.toString() ?? "",
      lastName: form.get("lastName")?.toString() ?? "",
      email: form.get("email")?.toString() ?? "",
    });
    if (err) {
      console.error(err);
      ctx.error = err;
      // error redirect
      return ctx.render({error: err});
    } else {
      return Response.redirect(new URL(`/dev/${dev.id}`, req.url));
    }
  },
};

export default function PreviewIndex(props: PageProps<DeveloperSchema>) {
  return (
    <div class="px-4 py-8 mx-auto h-screen flex justify-center">
      <div class="max-w-screen-md mx-auto flex flex-row items-center justify-center gap-4">
        <Preview />
        <div class="min-w-48">
          {JSON.stringify(props, null, 2)}
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}