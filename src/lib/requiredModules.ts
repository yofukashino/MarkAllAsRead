import { webpack } from "replugged";
import * as Types from "../types";

export const ReadStateStore = webpack.getByProps<Types.ReadStateStore>("getReadStatesByChannel");

export const AckUtilsModule = webpack.getBySource<Types.GenericModule>('type:"BULK_ACK"');

export const AckUtils = {
  bulkAck: webpack.getFunctionBySource(AckUtilsModule, 'type:"BULK_ACK"'),
} as Types.AckUtils;

export const GuildStore = webpack.getByProps<Types.GuildStore>("getGuild", "getGuilds");

export const AssetUtils = webpack.getByProps<Types.AssetUtils>("getUserAvatarURL");
