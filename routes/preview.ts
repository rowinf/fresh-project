import { ulid } from "@std/ulid";
import { writePreviewItem } from "../services/database.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const [err, preview] = await writePreviewItem({
      id: ulid(),
      profile: {
        firstName: form.get("firstName")?.toString() ?? "",
        lastName: form.get("lastName")?.toString() ?? "",
        email: form.get("email")?.toString() ?? "",
      },
    });
    if (err) {
      return Response.error();
    } else {
      return Response.redirect(new URL(`/preview/${preview.id}`, req.url));
    }
  },
};
