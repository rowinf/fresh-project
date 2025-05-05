import ProfileForm from "../../components/ProfileForm.tsx";
import Profile from "../../components/Profile.tsx";
import { Handlers } from "$fresh/server.ts";
import { DevItem } from "../../shared/api.ts";
import { loadDevItem, writeDevItem } from "../../services/database.ts";
import { pick } from "@std/collections";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { devId } = ctx.params;
    const [err, preview] = await loadDevItem(devId);
    if (err) {
      return ctx.renderNotFound();
    }
    return ctx.render(preview);
  },
  async PUT(req, ctx) {
    const { previewId } = ctx.params;
    const form = await req.formData();
    const [err, preview] = await writeDevItem({
      id: previewId,
      profile: {
        firstName: form.get("firstName")?.toString() ?? "",
        lastName: form.get("lastName")?.toString() ?? "",
        email: form.get("email")?.toString() ?? "",
      },
    });
    if (err) {
      return Response.error();
    } else {
      return ctx.render(preview);
    }
  },
};

interface PreviewProps {
  data: DevItem;
}

export default function PreviewById(props: PreviewProps) {
  const { data } = props;
  return (
    <div class="px-4 py-8 mx-auto h-screen flex justify-center">
      <div class="max-w-screen-md mx-auto flex flex-row items-center justify-center gap-4">
        <Profile {...pick(data.profile!, ["firstName", "lastName", "email"])} />
        <div class="min-w-48">
          <ProfileForm
            {...pick(data.profile!, ["firstName", "lastName", "email"])}
            hx-put={`/dev/${data.id}`}
            hx-target="#preview"
            hx-select="#preview"
            hx-swap="outerHTML transition:true"
          />
        </div>
      </div>
    </div>
  );
}
