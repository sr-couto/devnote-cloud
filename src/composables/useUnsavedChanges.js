import { useCounterStore } from "@/stores/counter"

export function useUnsavedChanges() {
  const counter = useCounterStore()

  const hasUnsavedChanges = () => {
    if (counter.project_body === "<p></p>") {
      return false
    }
    return (
      counter.loaded_id === "" && // If no document is loaded
      counter.project_body !== "" // If project body is marked as dirty
    )
  }

  return {
    hasUnsavedChanges,
  }
}
