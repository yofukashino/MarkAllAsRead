import { components, util } from "replugged";
import { ChannelStore, PluginLogger, SettingValues, UserStore } from "../index";
import { defaultSettings } from "../lib/consts";
import { IconSwitch } from "./IconSwitch";
import { AssetUtils, GuildStore } from "../lib/requiredModules";
import * as Utils from "../lib/utils";
import * as Types from "../types";
const { Category, SwitchItem } = components;
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
      <Category {...{ title: "Servers Blacklist", open: false }}>
        {...Object.values(GuildStore.getGuilds()).map((guild) => (
          <IconSwitch
            {...{
              title: guild.name,
              note: guild.description,
              icon:
                AssetUtils.getGuildIconURL(guild) ??
                AssetUtils.getDefaultAvatarURL(Utils.randomNo(0, 69)),
              ...(Utils.useSetting(
                SettingValues,
                `blacklistedServers.${guild.id}`,
                false as unknown as string,
              ) as unknown as Types.blacklist),
            }}
          />
        ))}
      </Category>
      <Category {...{ title: "DM Blacklist", open: false }}>
        {...Object.values(ChannelStore.getSortedPrivateChannels()).map((DM) => {
          const User = UserStore.getUser(DM.recipients[0]);
          return (
            <IconSwitch
              {...{
                title: User.tag,
                note: User.pronouns,
                icon:
                  AssetUtils.getUserAvatarURL(User) ??
                  AssetUtils.getDefaultAvatarURL(Utils.randomNo(0, 69)),
                ...(Utils.useSetting(
                  SettingValues,
                  `blacklistedDMs.${DM.id}`,
                  false as unknown as string,
                ) as unknown as Types.blacklist),
              }}
            />
          );
        })}
      </Category>
      <SwitchItem
        {...{
          note: "Get a toast confirmation when messages get marked as read.",
          ...util.useSetting(SettingValues, "showToast", defaultSettings.showToast),
        }}>
        Pop-up/Toast
      </SwitchItem>
      <SwitchItem
        {...{
          note: "Mark Only Pings/Mentions as Read instead of everything.",
          ...util.useSetting(SettingValues, "onlyMentions", defaultSettings.onlyMentions),
        }}>
        Only Mention/Pings
      </SwitchItem>
      <SwitchItem
        {...{
          note: "Still show the option to read even if there is nothing to mark read. (Enable In-Case of Performance Issues.)",
          ...util.useSetting(SettingValues, "showForever", defaultSettings.showForever),
        }}>
        Show Forever
      </SwitchItem>
    </div>
  );
};
