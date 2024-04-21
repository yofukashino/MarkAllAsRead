import { Injector, Logger, settings } from "replugged";
import { defaultSettings } from "./lib/consts";
import { registerSettings } from "./Components/Settings";
export const PluginLogger = Logger.plugin("MarkAllAsRead");
export const PluginInjector = new Injector();
export const SettingValues = await settings.init("dev.yofukashino.MarkAllAsRead", defaultSettings);
import Modules from "./lib/requiredModules";
import MenuItems from "./Components/MenuItem";
import HBCM from "./lib/HomeButtonContextMenuApi";
import Injections from "./injections/index";

export const start = (): void => {
  registerSettings();
  void Modules.loadModules().then(() => {
    HBCM.getAPI().addItem(
      "MarkAllAsRead",
      SettingValues.get("showForever", defaultSettings.showForever)
        ? MenuItems.foreverMenuItem
        : MenuItems.conditionalMenuItem,
    );
    Injections.applyInjections();
  });
};

export const stop = (): void => {
  HBCM.getAPI().removeItem("MarkAllAsRead");
  PluginInjector.uninjectAll();
};
export { Settings } from "./Components/Settings";
