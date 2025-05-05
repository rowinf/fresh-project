import { DevItem } from "../shared/api.ts";
import { ulid } from "@std/ulid";
import { mapValues } from "@std/collections";
import { z } from "zod";

export const db = await Deno.openKv();
export const devSchema = z.object({
  firstName: z.string().length(3, "too long").nullable(),
  lastName: z.string().nullable(),
  email: z.string().nullable(),
});
export const inputSchema = z.object({
  id: z.string().nullable(),
  profile: devSchema,
});
export type InputSchema = z.infer<typeof inputSchema>;

export async function loadDevItem(
  id: string,
  consistency: "strong" | "eventual" = "strong",
): Promise<[Error | null, DevItem | null]> {
  let out: DevItem | null = null;
  let err: Error | null = null;

  const preview = await db.get<DevItem>(["dev", id], {
    consistency,
  });
  if (preview.value === null) err = new Error("not found");
  else out = preview.value;

  return [err, out];
}

export async function writeDevItem(
  inputs: InputSchema,
): Promise<[Error | null, DevItem]> {
  const item: DevItem = {
    id: inputs.id ?? ulid(),
    profile: mapValues(inputs.profile, (val) => val ?? ""),
  };
  const key = ["dev", String(item.id)];

  const res = await db.atomic()
    .set(key, item)
    .commit();
  if (res.ok) {
    return [null, item];
  }
  return [new Error("save failed"), item];
}
