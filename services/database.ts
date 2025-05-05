import { PreviewItem, Profile } from "../shared/api.ts";
import { ulid } from "@std/ulid";
import { mapValues } from "@std/collections";
import { z } from "zod";

export const db = await Deno.openKv();
export const profileSchema = z.object({
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  email: z.string().nullable(),
});
export const inputSchema = z.object({
  id: z.string().nullable(),
  profile: profileSchema,
});
export type InputSchema = z.infer<typeof inputSchema>;

export const dbProfile = z.object({
  id: z.string(),
  data: profileSchema,
});

export async function loadPreviewItem(
  id: string,
  consistency: "strong" | "eventual" = "strong",
): Promise<[Error | null, PreviewItem | null]> {
  let out: PreviewItem | null = null;
  let err: Error | null = null;

  const preview = await db.get<PreviewItem>(["preview", id], {
    consistency,
  });
  if (preview.value === null) err = new Error("not found");
  else out = preview.value;

  return [err, out];
}

export async function writePreviewItem(
  inputs: InputSchema,
): Promise<[Error | null, PreviewItem]> {
  if (!inputs.id) {
    inputs.id = ulid();
  }

  const op = db.atomic();

  const item: PreviewItem = {
    id: inputs.id,
    profile: mapValues(inputs.profile, (val) => val ?? ""),
  };
  op.set(["preview", inputs.id], item);
  const {ok} = await op.commit();
  if (ok){
    return [null, item];
  }
  return [new Error("save failed"), item];
}
