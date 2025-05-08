import { z } from "zod";
import { DatabaseSync } from "node:sqlite";

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export const db = new DatabaseSync("local.sqlite");

db.exec(`
CREATE TABLE IF NOT EXISTS developers (
  id INTEGER PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL,
  links TEXT NOT NULL
);
`);

const loadDeveloperItemDB = db.prepare(`
SELECT * FROM developers WHERE id = ?;
`);

const createDeveloperItemDB = db.prepare(`
INSERT INTO developers (firstName, lastName, email, links)
VALUES (?, ?, ?, '');
`);

const updateDeveloperLinksJsonDB = db.prepare(`
UPDATE developers
SET links = ?
WHERE id = ?;
`);

const updateDeveloperProfileDB = db.prepare(`
UPDATE developers
SET firstName = ?, lastName = ?, email = ?
WHERE id = ?;
`);

const linkSchema = z.object({
  name: z.string(),
  url: z.string(),
});

const developerInputSchema = z.object({
  id: z.number().or(z.bigint()).nullish(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  links: z.array(linkSchema).nullish(),
});

const developerDBSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  links: z.string(),
});

export type DeveloperSchema = z.infer<typeof developerInputSchema>;

export function loadDeveloperItem(
  id: number,
): [Error | null, DeveloperSchema | null] {
  let out: DeveloperSchema | null = null;
  let err: Error | null = null;

  const developer = loadDeveloperItemDB.run(id) as unknown as z.infer<
    typeof developerDBSchema
  >;
  if (developer == null) {
    err = new NotFoundError("not found");
  } else {
    out = {
      id: developer.id,
      firstName: developer.firstName,
      lastName: developer.lastName,
      email: developer.email,
      links: developer.links ? JSON.parse(developer.links) : null,
    };
  }

  return [err, out];
}

export function writeDeveloperItem(
  id: number | null,
  inputs: DeveloperSchema,
): [Error | null, DeveloperSchema] {
  const itemDBSchema = developerInputSchema.safeParse(inputs);
  if (!itemDBSchema.success) {
    return [itemDBSchema.error, inputs];
  }
  if (id) {
    updateDeveloperProfileDB.run(
      itemDBSchema.data.firstName,
      itemDBSchema.data.lastName,
      itemDBSchema.data.email,
      id,
    );
  } else {
    const result = createDeveloperItemDB.run(
      inputs.firstName,
      inputs.lastName,
      inputs.email,
    );
    if (result.changes === 0) {
      return [new Error("Failed to create developer item"), inputs];
    }
    inputs.id = result.lastInsertRowid;
  }
  return [null, inputs];
}

export function closeDB() {
  db.close();
}
