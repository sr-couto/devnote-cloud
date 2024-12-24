import Dexie, { type EntityTable } from "dexie"
import dexieCloud from "dexie-cloud-addon"

interface Documents {
  id?: string
  date?: string
  project_data?: DocumentData
}

interface DocumentData {
  name: string
  body?: string
  checked?: boolean
}

const db = new Dexie("DB", { addons: [dexieCloud] }) as Dexie & {
  projects: EntityTable<Documents, "id">
}

db.version(1).stores({
  projects: "@id, date, project_data",
})

// Connect your dexie-cloud database:
db.cloud.configure({
  databaseUrl: "https://zyii8rlcy.dexie.cloud",
  requireAuth: true, // optional
  // customLoginGui: true
})

export type { Documents, DocumentData }
export { db }
