import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.ReadStateStore ??= await webpack.waitForProps<Types.ReadStateStore>(
    "getReadStatesByChannel",
  );
  Modules.AckUtils ??= await webpack.waitForProps<Types.AckUtils>("bulkAck", "ack");
  Modules.GuildStore ??= await webpack.waitForProps<Types.GuildStore>("getGuild", "getGuilds");
  Modules.IconUtils ??= await webpack.waitForProps<Types.IconUtils>("getUserAvatarURL");
  Modules.DiscordComponents ??= await webpack.waitForProps<Types.DiscordComponents>(
    "PopoutList",
    "AdvancedScrollerAuto",
  );
};

export default Modules;
