import { settings } from "replugged";
import {
  fluxHooks as FluxHooks,
  React,
  channels as UltimateChannelStore,
  lodash,
} from "replugged/common";

import { SettingValues } from "../index";
import { defaultSettings } from "./consts";
import Modules from "./requiredModules";
import Types from "../types";

export const getUnreads = (): Types.Unreads => {
  const { ReadStateStore } = Modules;
  const [onlyMentions, setOnlyMentions] = React.useState(
    SettingValues.get("onlyMentions", defaultSettings.onlyMentions),
  );
  const [blacklistedDMs, setBlacklistedDMs] = React.useState(
    SettingValues.get("blacklistedDMs", defaultSettings.blacklistedDMs),
  );
  const [blacklistedServers, setBlacklistedServers] = React.useState(
    SettingValues.get("blacklistedServers", defaultSettings.blacklistedServers),
  );
  React.useEffect(() => {
    setOnlyMentions(SettingValues.get("onlyMentions", defaultSettings.onlyMentions));
  }, [SettingValues.get("onlyMentions", defaultSettings.onlyMentions)]);
  React.useEffect(() => {
    setBlacklistedDMs(SettingValues.get("blacklistedDMs", defaultSettings.blacklistedDMs));
  }, [SettingValues.get("blacklistedDMs", defaultSettings.blacklistedDMs)]);
  React.useEffect(() => {
    setBlacklistedServers(
      SettingValues.get("blacklistedServers", defaultSettings.blacklistedServers),
    );
  }, [setBlacklistedServers]);
  return FluxHooks.useStateFromStores([ReadStateStore], () => {
    const AllReadStates = ReadStateStore.getAllReadStates();
    const OnlyUnreadOrMentions = AllReadStates.filter((m) =>
      onlyMentions ? m._mentionCount : ReadStateStore.hasUnread(m.channelId),
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
        !blacklistedDMs[m.channelId],
    );
    const UnreadGuildChannels = OnlyUnreadOrMentions.filter(
      (m) =>
        Boolean(UltimateChannelStore.getChannel(m.channelId)?.getGuildId()) &&
        !blacklistedServers[m._guildId],
    );
    const DMsToRead = UnreadDMs.map((m) => ({
      channelId: m.channelId,
      messageId: m._lastMessageId,
    }));
    const GuildChannelsToRead = UnreadGuildChannels.map((m) => ({
      channelId: m.channelId,
      messageId: m._lastMessageId,
    }));
    return {
      DMs: DMsToRead,
      GuildChannels: GuildChannelsToRead,
      All: [...DMsToRead, ...GuildChannelsToRead],
    };
  });
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
  P extends `${K}.${string}` | `${K}/${string}` | `${K}-${string}` | K,
  V extends P extends `${K}.${string}` | `${K}/${string}` | `${K}-${string}`
    ? NonNullable<Types.NestedType<T, P>>
    : P extends D
    ? NonNullable<T[P]>
    : F extends null | undefined
    ? T[P] | undefined
    : NonNullable<T[P]> | F,
>(
  settings: settings.SettingsManager<T, D>,
  key: P,
  fallback?: F,
): {
  value: V;
  onChange: (newValue: Types.ValType<Types.NestedType<T, P>> | Types.ValType<T[K]>) => void;
} => {
  const initial = settings.get(key as K) ?? lodash.get(settings.all(), key) ?? fallback;
  const [value, setValue] = React.useState(initial as V);

  return {
    value,
    onChange: (newValue: Types.ValType<Types.NestedType<T, P>> | Types.ValType<T[K]>) => {
      const isObj = newValue && typeof newValue === "object";
      const value = isObj && "value" in newValue ? newValue.value : newValue;
      const checked = isObj && "checked" in newValue ? newValue.checked : void 0;
      const target =
        isObj && "target" in newValue && newValue.target && typeof newValue.target === "object"
          ? newValue.target
          : void 0;
      const targetValue = target && "value" in target ? target.value : void 0;
      const targetChecked = target && "checked" in target ? target.checked : void 0;
      const finalValue = (checked ?? targetChecked ?? targetValue ?? value ?? newValue) as T[K];

      setValue(finalValue as V);

      if (settings.get(key as K)) {
        settings.set(key as K, finalValue);
      } else {
        const [rootKey] = key.split(/[-/.]/);
        const setting = lodash.set(settings.all(), key, finalValue)[rootKey as K];
        settings.set(rootKey as K, setting);
      }
    },
  };
};

export const useSettingArray = <
  T extends Record<string, Types.Jsonifiable>,
  D extends keyof T,
  K extends Extract<keyof T, string>,
  F extends Types.NestedType<T, P> | T[K] | undefined,
  P extends `${K}.${string}` | `${K}/${string}` | `${K}-${string}` | K,
  V extends P extends `${K}.${string}` | `${K}/${string}` | `${K}-${string}`
    ? NonNullable<Types.NestedType<T, P>>
    : P extends D
    ? NonNullable<T[P]>
    : F extends null | undefined
    ? T[P] | undefined
    : NonNullable<T[P]> | F,
>(
  settings: settings.SettingsManager<T, D>,
  key: P,
  fallback?: F,
): [V, (newValue: Types.ValType<Types.NestedType<T, P>> | Types.ValType<T[K]>) => void] => {
  const { value, onChange } = useSetting(settings, key, fallback);

  return [value as V, onChange];
};

export default { getUnreads, getAcronym, randomNo, useSetting, useSettingArray };
