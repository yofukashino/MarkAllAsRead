import Types from "./types";
export default [
  {
    find: "Messages.DISCODO_DISABLED",
    replacements: [
      {
        match: /},(children.{40,52}?"friends-list")/,
        replace: (_, suffix: string) =>
          `},onContextMenu: window.HomeButtonContextMenuApi?.openContextMenu,${suffix}`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
