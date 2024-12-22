import Dexie from "dexie"
import dexieCloud from "dexie-cloud-addon"

export const db = new Dexie("DB", { addons: [dexieCloud] })

db.version(1).stores({
  file: "@id, date, name",
  projects: "@id, date",
})

// Connect your dexie-cloud database:
db.cloud.configure({
  databaseUrl: "https://zyii8rlcy.dexie.cloud",
  requireAuth: true, // optional
  // customLoginGui: true
})
