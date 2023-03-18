import { webpack } from "replugged";
import * as Types from "../types";

export const ReadStateStore = webpack.getByProps(
  "getReadStatesByChannel",
) as unknown as Types.ReadStateStore;

export const AckUtilsModule = webpack.getBySource(
  'type:"BULK_ACK"',
) as unknown as Types.GenericModule;

export const AckUtils = {
  bulkAck: webpack.getFunctionBySource(AckUtilsModule, 'type:"BULK_ACK"'),
};

export const GuildStore = webpack.getByProps(
  "getGuild",
  "getGuilds",
) as unknown as Types.GuildStore;

export const AssetUtils = webpack.getByProps("getUserAvatarURL") as unknown as Types.AssetUtils;
