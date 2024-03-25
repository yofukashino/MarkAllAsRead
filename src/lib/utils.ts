import { settings } from "replugged";
import { React, channels as UltimateChannelStore, lodash } from "replugged/common";

import { SettingValues } from "../index";
import { defaultSettings } from "./consts";
import { ReadStateStore } from "./requiredModules";
import Types from "../types";

export const getUnreads = (): Types.Unreads => {
  const AllReadStates = ReadStateStore.getAllReadStates();
  const OnlyUnreadOrMentions = AllReadStates.filter((m) =>
    SettingValues.get("onlyMentions", defaultSettings.onlyMentions)
      ? m._mentionCount
      : ReadStateStore.hasUnread(m.channelId),
  );
  if (!OnlyUnreadOrMentions.length)
    return {
      DMs: [],
      GuildChannels: [],
      All: [],
    };
  const UnreadDMs = OnlyUnreadOrMentions.filter(
    (m) =>
      (UltimateChannelStore.getChannel(m.channelId)?.isDM() ||
        UltimateChannelStore.getChannel(m.channelId)?.isGroupDM()) &&
      !SettingValues.get("blacklistedDMs", defaultSettings.blacklistedDMs)[m.channelId],
  );
  const UnreadGuildChannels = OnlyUnreadOrMentions.filter(
    (m) =>
      Boolean(UltimateChannelStore.getChannel(m.channelId)?.getGuildId()) &&
      !SettingValues.get("blacklistedServers", defaultSettings.blacklistedServers)[m._guildId],
  );
  const DMsToRead = UnreadDMs.map((m) => ({ channelId: m.channelId, messageId: m._lastMessageId }));
  const GuildChannelsToRead = UnreadGuildChannels.map((m) => ({
    channelId: m.channelId,
    messageId: m._lastMessageId,
  }));
  return {
    DMs: DMsToRead,
    GuildChannels: GuildChannelsToRead,
    All: [...DMsToRead, ...GuildChannelsToRead],
  };
};

export const getAcronym = (string: string): string =>
  string != null
    ? string
        .replace(/'s /g, " ")
        .replace(/\w+/g, (string) => string[0])
        .replace(/\s/g, "")
    : "";
export const randomNo = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const useSetting = <
  T extends Record<string, Types.Jsonifiable>,
  D extends keyof T,
  K extends Extract<keyof T, string>,
  F extends Types.NestedType<T, P> | T[K] | undefined,
  P extends `${K}.${string}` | K,
>(
  settings: settings.SettingsManager<T, D>,
  key: P,
  fallback?: F,
): {
  value: Types.NestedType<T, P> | F;
  onChange: (newValue: Types.ValType<Types.NestedType<T, P> | F>) => void;
} => {
  const [initialKey, ...pathArray] = Object.keys(settings.all()).includes(key)
    ? ([key] as [K])
    : (key.split(".") as [K, ...string[]]);
  const path = pathArray.join(".");
  const initial = settings.get(initialKey, path.length ? ({} as T[K]) : (fallback as T[K]));
  const [value, setValue] = React.useState<Types.NestedType<T, P>>(
    path.length
      ? (lodash.get(initial, path, fallback) as Types.NestedType<T, P>)
      : (initial as Types.NestedType<T, P>),
  );

  return {
    value,
    onChange: (newValue: Types.ValType<Types.NestedType<T, P> | F>) => {
      const isObj = newValue && typeof newValue === "object";
      const value = isObj && "value" in newValue ? newValue.value : newValue;
      const checked = isObj && "checked" in newValue ? newValue.checked : void 0;
      const target =
        isObj && "target" in newValue && newValue.target && typeof newValue.target === "object"
          ? newValue.target
          : void 0;
      const targetValue = target && "value" in target ? target.value : void 0;
      const targetChecked = target && "checked" in target ? target.checked : void 0;
      const finalValue = checked ?? targetChecked ?? targetValue ?? value ?? newValue;

      setValue(finalValue as Types.NestedType<T, P>);
      settings.set(
        initialKey,
        path.length ? (lodash.set(initial, path, finalValue) as T[K]) : (finalValue as T[K]),
      );
    },
  };
};

export default { getUnreads, getAcronym, randomNo, useSetting };
