import { FluxDispatcher } from "../index";
import { MessageChecker } from "./MessageChecker";

export const addListeners = (): void => {
  FluxDispatcher.subscribe("MESSAGE_CREATE", MessageChecker);
  FluxDispatcher.subscribe("MESSAGE_ACK", MessageChecker);
};
export const removeListeners = (): void => {
  FluxDispatcher.unsubscribe("MESSAGE_CREATE", MessageChecker);
  FluxDispatcher.unsubscribe("MESSAGE_ACK", MessageChecker);
};
