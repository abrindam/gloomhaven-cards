import { autorun } from "mobx";
import { serialize, deserialize } from "serializr";
import { update } from "serializr";

export function setupPersistence<T>(targetObject: T, persistanceName: string): void {

  const persisted = localStorage.getItem(persistanceName)
  if (persisted != undefined) {
    update(targetObject, JSON.parse(persisted), () => {}, null)
  }

  autorun(() => {
    localStorage.setItem(persistanceName, JSON.stringify(serialize(targetObject)))
  })

}