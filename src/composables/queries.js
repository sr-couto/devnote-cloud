import { db } from "@/db"
import { liveQuery } from "dexie"
import { useObservable } from "@vueuse/rxjs"

export const allItemsTodo = useObservable(
  liveQuery(() =>
    db.projects
      .reverse()
      .toArray()
      .then((items) => items.filter((item) => !item.project_data.checked)),
  ),
)

export const allItemsChecked = useObservable(
  liveQuery(() =>
    db.projects
      .reverse()
      .toArray()
      .then((items) => items.filter((item) => item.project_data.checked)),
  ),
)
