import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.ReadStateStore ??= await webpack.getByStoreName<Types.ReadStateStore>("ReadStateStore");
  Modules.IconUtils ??= await webpack
    .waitForProps<Types.IconUtils>(["getUserAvatarURL"], {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find IconUtils Module");
    });

  Modules.AckUtilsModules ??= await webpack
    .waitForModule<Types.GenericModule>(webpack.filters.bySource('type:"BULK_ACK"'), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find AckUtils Module");
    });

  Modules.AckUtils = {
    ack: webpack.getFunctionBySource(Modules.AckUtilsModules, ".getActiveJoinedThreadsForParent"),
    ackChannel: webpack.getFunctionBySource(Modules.AckUtilsModules, 'type:"CHANNEL_ACK"'),
    ackGuildFeature: webpack.getFunctionBySource(
      Modules.AckUtilsModules,
      'type:"GUILD_FEATURE_ACK"',
    ),
    ackUserFeature: webpack.getFunctionBySource(
      Modules.AckUtilsModules,
      'type:"USER_NON_CHANNEL_ACK"',
    ),
    bulkAck: webpack.getFunctionBySource(Modules.AckUtilsModules, 'type:"BULK_ACK"'),
    disableAutomaticAck: webpack.getFunctionBySource(
      Modules.AckUtilsModules,
      'type:"DISABLE_AUTOMATIC_ACK"',
    ),
    enableAutomaticAck: webpack.getFunctionBySource(
      Modules.AckUtilsModules,
      'type:"ENABLE_AUTOMATIC_ACK"',
    ),
    localAck: webpack.getFunctionBySource(Modules.AckUtilsModules, 'type:"CHANNEL_LOCAL_ACK"'),
  };
};

export default Modules;
