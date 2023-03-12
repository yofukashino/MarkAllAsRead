import { components } from "replugged";
import { Toasts } from "../index";
import { AckUtils } from "../lib/requiredModules";
import * as Icons from "./Icons";
import * as Utils from "../lib/utils";
import * as Types from "../types";

const {
  ContextMenu: { MenuItem, MenuGroup },
} = components;
export const conditionalMenuItem = (): Types.ReactElement | null => {
  const { DMs, GuildChannels, All } = Utils.getUnreads();
  if (!All.length) return null;
  const isSubMenu = DMs.length && GuildChannels.length;
  return (
    <MenuItem
      {...{
        label: "Mark All as Read",
        id: "mark-all-read",
        icon: () => Boolean(isSubMenu) || Icons.message("20", "20"),
        action: () => {
          AckUtils.bulkAck(All);
          Toasts.toast(`Marked All As Read`, Toasts.Kind.SUCCESS);
        },
        children: isSubMenu && (
          <MenuGroup>
            <MenuItem
              {...{
                label: "Mark All Guilds as Read",
                id: "mark-all-guild-read",
                icon: () => Icons.guilds("20", "20"),
                action: () => {
                  AckUtils.bulkAck(GuildChannels);
                  Toasts.toast(`Marked All Guilds as Read`, Toasts.Kind.SUCCESS);
                },
              }}
            />
            <MenuItem
              {...{
                label: "Mark All DMs as Read",
                id: "mark-all-dm-read",
                icon: () => Icons.dms("20", "20"),
                action: () => {
                  AckUtils.bulkAck(DMs);
                  Toasts.toast(`Marked All DMs as Read`, Toasts.Kind.SUCCESS);
                },
              }}
            />
          </MenuGroup>
        ),
      }}
    />
  );
};
export const foreverMenuItem = (): Types.ReactElement | null => {
  return (
    <MenuItem
      {...{
        label: "Mark All as Read",
        id: "mark-all-read",
        action: () => {
          const { All } = Utils.getUnreads();
          AckUtils.bulkAck(All);
          Toasts.toast(`Marked All As Read`, Toasts.Kind.SUCCESS);
        },
        children: (
          <MenuGroup>
            <MenuItem
              {...{
                label: "Mark All Guilds as Read",
                id: "mark-all-guild-read",
                icon: () => Icons.guilds("20", "20"),
                action: () => {
                  const { GuildChannels } = Utils.getUnreads();
                  AckUtils.bulkAck(GuildChannels);
                  Toasts.toast(`Marked All Guilds as Read`, Toasts.Kind.SUCCESS);
                },
              }}
            />
            <MenuItem
              {...{
                label: "Mark All DMs as Read",
                id: "mark-all-dm-read",
                icon: () => Icons.dms("20", "20"),
                action: () => {
                  const { DMs } = Utils.getUnreads();
                  AckUtils.bulkAck(DMs);
                  Toasts.toast(`Marked All DMs as Read`, Toasts.Kind.SUCCESS);
                },
              }}
            />
          </MenuGroup>
        ),
      }}
    />
  );
};
