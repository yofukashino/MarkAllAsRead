import { webpack } from "replugged";
import Types from "../types";

export const ReadStateStore = webpack.getByProps<Types.ReadStateStore>("getReadStatesByChannel");

export const AckUtils = webpack.getByProps<Types.AckUtils>("bulkAck", "ack");

export const GuildStore = webpack.getByProps<Types.GuildStore>("getGuild", "getGuilds");

export const IconUtils = webpack.getByProps<Types.IconUtils>("getUserAvatarURL");

export const DiscordComponents = webpack.getByProps<Types.DiscordComponents>(
  "PopoutList",
  "AdvancedScrollerAuto",
);
