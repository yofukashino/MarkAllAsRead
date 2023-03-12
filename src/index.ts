import { Injector, Logger, common, settings } from "replugged";
export const {
  toast: Toasts,
  channels: ChannelStore,
  users: UserStore,
  messages: MessageActions,
  fluxDispatcher: FluxDispatcher,
  React,
} = common;
import { defaultSettings } from "./lib/consts";
import { registerSettings } from "./Components/Settings";
export const PluginLogger = Logger.plugin("MarkAllAsRead");
export const PluginInjector = new Injector();
export const SettingValues = await settings.init("Tharki.MarkAllAsRead", defaultSettings);
import { addListeners, removeListeners } from "./listeners/index";
import { conditionalMenuItem, foreverMenuItem } from "./Components/MenuItem";

import { HBCM } from "./lib/HomeButtonContextMenuApi";

export const start = (): void => {
  registerSettings();
  if (SettingValues.get("showForever", defaultSettings.showForever))
    HBCM.addItem("MarkAllAsRead", foreverMenuItem());
  else addListeners();
  HBCM.addItem("MarkAllAsRead", conditionalMenuItem());
};

export const stop = (): void => {
  HBCM.removeItem("MarkAllAsRead");
  removeListeners();
};
export { Settings } from "./Components/Settings";
