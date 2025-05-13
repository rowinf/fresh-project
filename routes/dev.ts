import { ulid } from "@std/ulid";
import { writeDevItem } from "../services/sqlite.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const [err, dev] = writeDevItem(
      null,
      {
        firstName: form.get("firstName")?.toString() ?? "",
        lastName: form.get("lastName")?.toString() ?? "",
        email: form.get("email")?.toString() ?? "",
      },
    );
    if (err) {
      return Response.error();
    } else {
      return Response.redirect(new URL(`/dev/${dev.id}`, req.url));
    }
  },
};
