import { autorun } from "mobx";
import { serialize, deserialize, custom } from "serializr";
import { update } from "serializr";
import { Logger } from "./Logger";

const dataModelVersion = 1

var upgradeHandled = false

function handleUpgradeBadly() {
  if (upgradeHandled) return 
  const savedDataModelVersion =  parseInt(localStorage.getItem("dataModelVersion"))
  if (savedDataModelVersion != dataModelVersion && localStorage.length > 0) {
    const ok = confirm("Your saved data is incompatible with this version of the application. Press OK to clear saved data.")
    if (ok) {
      localStorage.clear()
      Logger.log("Cleared persistence store due to data incompatibility")
    }
  }
  localStorage.setItem("dataModelVersion", dataModelVersion + "")
  upgradeHandled = true
}

export function setupPersistence<T>(targetObject: T, persistanceName: string): void {

  handleUpgradeBadly()

  const persisted = localStorage.getItem(persistanceName)
  if (persisted != undefined) {
    update(targetObject, JSON.parse(persisted), () => {}, null)
  }

  autorun(() => {
    localStorage.setItem(persistanceName, JSON.stringify(serialize(targetObject)))
  })

}

export function literal() { return custom((val) => val, (val) => val)  }