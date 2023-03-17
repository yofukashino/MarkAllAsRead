import { React, SettingValues } from "../index";
import { defaultSettings } from "./consts";
import { ChannelStore, ReadStateStore } from "./requiredModules";
import lodash from "lodash";
import * as Types from "../types";

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
      (ChannelStore.getChannel(m.channelId)?.isDM() ||
        ChannelStore.getChannel(m.channelId)?.isGroupDM()) &&
      !SettingValues.get("blacklistedDMs", defaultSettings.blacklistedDMs)[m.channelId],
  );
  const UnreadGuildChannels = OnlyUnreadOrMentions.filter(
    (m) =>
      Boolean(ChannelStore.getChannel(m.channelId)?.getGuildId()) &&
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

export const randomNo = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const useSetting = (
  settingsManager: typeof SettingValues,
  path: string,
  defaultValue?: string,
  options?: { clearable?: boolean },
): {
  value: string;
  onChange: (newValue: string | { value: string }) => void;
  onClear: () => void;
} => {
  const { clearable = false } = options ?? {};
  const [key, ...realPath] = path.split(".");

  const realPathJoined = realPath.join(".");
  const setting = settingsManager.get(key as keyof Types.Settings);
  const initial = realPath.length
    ? lodash.get(setting, realPathJoined, defaultValue)
    : (setting as unknown as string);
  const [value, setValue] = React.useState(initial);

  return {
    value,
    onClear: clearable
      ? () => {
          setValue("");
          const changed = realPath.length
            ? lodash.set(setting as object, realPathJoined, "")
            : ("" as never);
          settingsManager.set(key as keyof Types.Settings, changed);
        }
      : () => null,
    onChange: (newValue) => {
      if (typeof newValue == "object" && Object.hasOwnProperty.call(newValue, "value"))
        newValue = newValue.value;
      setValue(newValue as unknown as string);
      const changed = realPath.length
        ? lodash.set(setting as object, realPathJoined, newValue)
        : (newValue as never);
      settingsManager.set(key as keyof Types.Settings, changed);
    },
  };
};
