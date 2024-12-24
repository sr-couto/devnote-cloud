import { useDatabaseStore } from "@/stores/database"

export function useUnsavedChanges() {
  const db_store = useDatabaseStore()

  const hasUnsavedChanges = () => {
    if (db_store.project_body === "<p></p>") {
      return false
    }
    return (
      db_store.loaded_id === 0 && // If no document is loaded
      db_store.project_body !== "" // If project body is marked as dirty
    )
  }

  return {
    hasUnsavedChanges,
  }
}
