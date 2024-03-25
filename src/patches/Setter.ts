import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Listeners from "../listeners/index";
import MenuItems from "../Components/MenuItem";
import HBCM from "../lib/HomeButtonContextMenuApi";
export default (): void => {
  PluginInjector.after(SettingValues, "set", () => {
    HBCM.getAPI().removeItem("MarkAllAsRead");
    Listeners.removeListeners();
    HBCM.getAPI().addItem(
      "MarkAllAsRead",
      SettingValues.get("showForever", defaultSettings.showForever)
        ? MenuItems.foreverMenuItem()
        : MenuItems.conditionalMenuItem(),
    );
    if (!SettingValues.get("showForever", defaultSettings.showForever)) Listeners.addListeners();
  });
};
