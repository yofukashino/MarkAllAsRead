import { Injector, Logger, settings } from "replugged";
import { defaultSettings } from "./lib/consts";
import { registerSettings } from "./Components/Settings";
export const PluginLogger = Logger.plugin("MarkAllAsRead");
export const PluginInjector = new Injector();
export const SettingValues = await settings.init("dev.tharki.MarkAllAsRead", defaultSettings);
import Listeners from "./listeners/index";
import MenuItems from "./Components/MenuItem";
import HBCM from "./lib/HomeButtonContextMenuApi";
import Injections from "./patches/index";

export const start = (): void => {
  registerSettings();
  HBCM.getAPI().addItem(
    "MarkAllAsRead",
    SettingValues.get("showForever", defaultSettings.showForever)
      ? MenuItems.foreverMenuItem()
      : MenuItems.conditionalMenuItem(),
  );
  if (!SettingValues.get("showForever", defaultSettings.showForever)) Listeners.addListeners();
  Injections.applyInjections();
};

export const stop = (): void => {
  HBCM.getAPI().removeItem("MarkAllAsRead");
  Listeners.removeListeners();
  PluginInjector.uninjectAll();
};
export { Settings } from "./Components/Settings";
