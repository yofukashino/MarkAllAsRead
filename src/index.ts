import { Injector, Logger, common, settings } from "replugged";
export const { toast: Toasts, channels: ChannelStore, users: UserStore, React } = common;
import { defaultSettings } from "./lib/consts";
import { registerSettings } from "./Components/Settings";
export const PluginLogger = Logger.plugin("MarkAllAsRead");
export const PluginInjector = new Injector();
export const SettingValues = await settings.init("dev.tharki.MarkAllAsRead", defaultSettings);
import { addListeners, removeListeners } from "./listeners/index";
import { conditionalMenuItem, foreverMenuItem } from "./Components/MenuItem";
import HBCM from "./lib/HomeButtonContextMenuApi";
import { applyInjections } from "./patches/index";

export const start = (): void => {
  registerSettings();
  HBCM.addItem(
    "MarkAllAsRead",
    SettingValues.get("showForever", defaultSettings.showForever)
      ? foreverMenuItem()
      : conditionalMenuItem(),
  );
  if (!SettingValues.get("showForever", defaultSettings.showForever)) addListeners();
  applyInjections();
};

export const stop = (): void => {
  HBCM.removeItem("MarkAllAsRead");
  removeListeners();
  PluginInjector.uninjectAll();
};
export { Settings } from "./Components/Settings";
