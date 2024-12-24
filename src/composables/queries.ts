import { db } from "@/db"
import { liveQuery } from "dexie"
import { from } from "rxjs"
import { useObservable } from "@vueuse/rxjs"
import type { Documents } from "@/db"
import { Ref } from "vue"

// Convert Dexie's liveQuery to an rxjs Observable using 'from'
export const allItemsTodo = useObservable(
  from(
    liveQuery(() =>
      db.projects
        .reverse()
        .toArray()
        .then((items) => items.filter((item) => !item.project_data?.checked)),
    ),
  ),
) as Ref<Documents[] | undefined>

export const allItemsChecked = useObservable(
  from(
    liveQuery(() =>
      db.projects
        .reverse()
        .toArray()
        .then((items) => items.filter((item) => item.project_data?.checked)),
    ),
  ),
) as Ref<Documents[] | undefined>
