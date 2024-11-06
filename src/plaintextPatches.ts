import Types from "./types";
export default [
  {
    find: '("discodo")',
    replacements: [
      {
        match: /.tutorialContainer,/,
        replace: (prefix: string) =>
          `${prefix}onContextMenu:window[Symbol.for("HomeButtonContextMenuApi")]?.openContextMenu,`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
