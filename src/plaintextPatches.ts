import * as Types from "./types";
export default [
  {
    find: "Messages.DISCODO_DISABLED",
    replacements: [
      {
        match: /(className:.*\.[\w]+),(children.*"friends-list")/,
        replace: `$1,onContextMenu: HomeButtonContextMenuApi?.openContextMenu,$2`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
