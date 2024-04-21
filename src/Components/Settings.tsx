import { util } from "replugged";
import { Category, SwitchItem } from "replugged/components";
import { PluginLogger, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import SearchableDMs from "./SearchableDMs";
import SearchableGuilds from "./SearchableGuilds";
import Types from "../types";

export const registerSettings = (): void => {
  for (const key in defaultSettings) {
    if (SettingValues.has(key as keyof Types.Settings)) return;
    PluginLogger.log(`Adding new setting ${key} with value ${defaultSettings[key]}.`);
    SettingValues.set(key as keyof Types.Settings, defaultSettings[key]);
  }
};

export const Settings = () => {
  return (
    <div>
      <Category title="Servers Blacklist" open={false}>
        <SearchableGuilds SettingManager={SettingValues} path="blacklistedServers" />
      </Category>
      <Category title="DM Blacklist" open={false}>
        <SearchableDMs SettingManager={SettingValues} path="blacklistedDMs" />
      </Category>
      <SwitchItem
        note="Get a toast confirmation when messages get marked as read."
        {...util.useSetting(SettingValues, "showToast", defaultSettings.showToast)}>
        Pop-up/Toast
      </SwitchItem>
      <SwitchItem
        note="Mark Only Pings/Mentions as Read instead of everything."
        {...util.useSetting(SettingValues, "onlyMentions", defaultSettings.onlyMentions)}>
        Only Mention/Pings
      </SwitchItem>
      <SwitchItem
        note="Still show the option to read even if there is nothing to mark read. (Enable In-Case of Performance Issues.)"
        {...util.useSetting(SettingValues, "showForever", defaultSettings.showForever)}>
        Show Forever
      </SwitchItem>
    </div>
  );
};

export default { registerSettings, defaultSettings };
