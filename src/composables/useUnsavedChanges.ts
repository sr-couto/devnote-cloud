import { useDatabaseStore } from "@/stores/database"
import { useModalStore } from "@/stores/modal"

export function useUnsavedChanges() {
  const db_store = useDatabaseStore()
  const modal = useModalStore()

  const hasUnsavedChanges = () => {
    if (db_store.project_body === "<p></p>") {
      return false
    }
    return (
      db_store.loaded_id === "" && // If no document is loaded
      db_store.project_body !== "" // If project body is marked as dirty
    )
  }

  return {
    hasUnsavedChanges,
  }
}
