import { Dexie, type EntityTable } from "dexie";

import type { PresentationSetting } from "../types/db.ts";

export const db = new Dexie("PresentationSettings") as Dexie & {
	presentationSettings: EntityTable<PresentationSetting, "id">;
};
db.version(1).stores({
	presentationSettings: "++id, value, name, description",
});
