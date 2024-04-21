import { settings } from "replugged";
import {
  React,
  channels as UltimateChannelStore,
  users as UltimateUserStore,
} from "replugged/common";
import Modules from "../lib/requiredModules";
import IconSwitch from "./IconSwitch";
import Utils from "../lib/utils";
import Types from "../types";

export default <
  T extends Record<string, Types.Jsonifiable>,
  D extends keyof T,
  K extends Extract<keyof T, string>,
>({
  SettingManager,
  path,
}: {
  SettingManager: settings.SettingsManager<T, D>;
  path: `${K}.${string}` | K;
}) => {
  const {
    DiscordComponents: {
      PopoutList: { SearchBar, Divider },
    },
    IconUtils,
  } = Modules;
  const [searchValue, setSearchValue] = React.useState([]);
  const filteredGuildsWithState = Object.values(UltimateChannelStore.getSortedPrivateChannels())
    .map((Channel: Types.Channel) =>
      Channel.isGroupDM()
        ? {
            Channel,
            User: null,
            ...(Utils.useSetting(SettingManager, `${path}.${Channel.id}`, false as never) as {
              value: boolean;
              onChange: (e: boolean) => void;
            }),
          }
        : {
            Channel: null,
            User: UltimateUserStore.getUser(Channel.recipients[0]),
            ...(Utils.useSetting(SettingManager, `${path}.${Channel.id}`, false as never) as {
              value: boolean;
              onChange: (e: boolean) => void;
            }),
          },
    )
    .filter(({ Channel, User }: { Channel: Types.Channel | null; User: Types.User | null }) =>
      searchValue
        ? searchValue.every((value) =>
            Channel
              ? Channel?.name?.toLowerCase().includes(value.toLowerCase())
              : User?.globalName?.toLowerCase().includes(value.toLowerCase()),
          ) ||
          searchValue.every((value) =>
            Channel
              ? Channel?.topic?.toLowerCase().includes(value.toLowerCase())
              : User?.username?.toLowerCase().includes(value.toLowerCase()),
          ) ||
          (searchValue.some((value) =>
            Channel
              ? Channel?.name?.toLowerCase().includes(value.toLowerCase())
              : User?.globalName?.toLowerCase().includes(value.toLowerCase()),
          ) &&
            searchValue.some((value) =>
              Channel
                ? Channel?.topic?.toLowerCase().includes(value.toLowerCase())
                : User?.username?.toLowerCase().includes(value.toLowerCase()),
            )) ||
          searchValue.some((value) => Channel?.id?.includes(value))
        : true,
    )
    .sort((a, b) =>
      a.Channel
        ? a.Channel?.name?.localeCompare(b.User?.name ?? b.Channel?.name)
        : a.User?.name?.localeCompare(b.User?.name ?? b.Channel?.name),
    );

  return (
    <div className={`read-dms-search`}>
      <SearchBar
        autoFocus={true}
        placeholder="Search DMs & GDMs"
        query={searchValue.join(" ") || ""}
        onChange={(query) => setSearchValue(query.split(" "))}
        onClear={() => setSearchValue([])}
      />
      <Divider />
      {filteredGuildsWithState.map(({ User, Channel, ...state }) => (
        <IconSwitch
          key={User?.id ?? Channel?.id} // Don't forget to add a unique key
          title={
            User?.globalName ||
            User?.username ||
            Channel?.name ||
            Channel?.recipients
              ?.map((uid) => {
                const User = UltimateUserStore.getUser(uid) as Types.User;
                return User?.globalName ?? User?.username;
              })
              ?.join(", ")
          }
          note={User?.bio ?? Channel?.topic}
          icon={
            (Channel
              ? (IconUtils.default.getChannelIconURL(Channel) as string)
              : (IconUtils.default.getUserAvatarURL(User) as string)) ??
            Utils.getAcronym(User?.globalName ?? User?.username ?? Channel?.name)
          }
          {...state}
        />
      ))}
    </div>
  );
};
