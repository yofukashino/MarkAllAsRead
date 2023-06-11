import { conditionalMenuItem } from "../Components/MenuItem";
import HBCM from "../lib/HomeButtonContextMenuApi";
export const checkReadStates = (): void => {
  HBCM.addItem("MarkAllAsRead", conditionalMenuItem());
};
