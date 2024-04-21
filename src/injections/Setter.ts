import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import MenuItems from "../Components/MenuItem";
import HBCM from "../lib/HomeButtonContextMenuApi";

export default (): void => {
  PluginInjector.after(SettingValues, "set", ([name]) => {
    if (name !== "showForever") return;
    HBCM.getAPI().removeItem("MarkAllAsRead");
    HBCM.getAPI().addItem(
      "MarkAllAsRead",
      SettingValues.get("showForever", defaultSettings.showForever)
        ? MenuItems.foreverMenuItem()
        : MenuItems.conditionalMenuItem(),
    );
  });
};
