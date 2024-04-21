import { toast as Toasts } from "replugged/common";
import { ContextMenu } from "replugged/components";
import Modules from "../lib/requiredModules";
import Icons from "./Icons";
import Utils from "../lib/utils";

const { MenuItem, MenuGroup } = ContextMenu;
export const conditionalMenuItem = (): React.ReactElement => {
  const { AckUtils } = Modules;
  const { DMs, GuildChannels, All } = Utils.getUnreads();
  if (!All.length) return <></>;
  const isSubMenu = DMs.length && GuildChannels.length;
  return (
    <MenuItem
      label="Mark All as Read"
      id="mark-all-read"
      icon={!isSubMenu ? () => <Icons.message width="20" height="20" /> : null}
      action={() => {
        AckUtils.bulkAck(All);
        Toasts.toast(`Marked All As Read`, Toasts.Kind.SUCCESS);
      }}>
      {isSubMenu && (
        <MenuGroup>
          <MenuItem
            label="Mark All Guilds as Read"
            id="mark-all-guild-read"
            icon={() => <Icons.guilds width="20" height="20" />}
            action={() => {
              AckUtils.bulkAck(GuildChannels);
              Toasts.toast(`Marked All Guilds as Read`, Toasts.Kind.SUCCESS);
            }}
          />
          <MenuItem
            label="Mark All DMs as Read"
            id="mark-all-dm-read"
            icon={() => <Icons.dms width="20" height="20" />}
            action={() => {
              AckUtils.bulkAck(DMs);
              Toasts.toast(`Marked All DMs as Read`, Toasts.Kind.SUCCESS);
            }}
          />
        </MenuGroup>
      )}
    </MenuItem>
  );
};
export const foreverMenuItem = (): React.ReactElement => {
  const { AckUtils } = Modules;
  return (
    <MenuItem
      label="Mark All as Read"
      id="mark-all-read"
      action={() => {
        const { All } = Utils.getUnreads();
        AckUtils.bulkAck(All);
        Toasts.toast(`Marked All As Read`, Toasts.Kind.SUCCESS);
      }}>
      <MenuGroup>
        <MenuItem
          label="Mark All Guilds as Read"
          id="mark-all-guild-read"
          icon={() => <Icons.guilds width="20" height="20" />}
          action={() => {
            const { GuildChannels } = Utils.getUnreads();
            AckUtils.bulkAck(GuildChannels);
            Toasts.toast(`Marked All Guilds as Read`, Toasts.Kind.SUCCESS);
          }}
        />
        <MenuItem
          label="Mark All DMs as Read"
          id="mark-all-dm-read"
          icon={() => <Icons.dms width="20" height="20" />}
          action={() => {
            const { DMs } = Utils.getUnreads();
            AckUtils.bulkAck(DMs);
            Toasts.toast(`Marked All DMs as Read`, Toasts.Kind.SUCCESS);
          }}
        />
      </MenuGroup>
    </MenuItem>
  );
};

export default { conditionalMenuItem, foreverMenuItem };
