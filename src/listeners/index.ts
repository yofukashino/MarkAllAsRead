import { ReadStateStore } from "../lib/requiredModules";
import { checkReadStates } from "./ReadStateChecker";

export const addListeners = (): void => {
  ReadStateStore.addChangeListener(checkReadStates);
};
export const removeListeners = (): void => {
  ReadStateStore.removeChangeListener(checkReadStates);
};
