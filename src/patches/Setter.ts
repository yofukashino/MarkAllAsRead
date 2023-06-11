import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import { addListeners, removeListeners } from "../listeners/index";
import { conditionalMenuItem, foreverMenuItem } from "../Components/MenuItem";
import HBCM from "../lib/HomeButtonContextMenuApi";
export const patchSettingSetter = (): void => {
  PluginInjector.after(SettingValues, "set", () => {
    HBCM.removeItem("MarkAllAsRead");
    removeListeners();
    HBCM.addItem(
      "MarkAllAsRead",
      SettingValues.get("showForever", defaultSettings.showForever)
        ? foreverMenuItem()
        : conditionalMenuItem(),
    );
    if (!SettingValues.get("showForever", defaultSettings.showForever)) addListeners();
  });
};
