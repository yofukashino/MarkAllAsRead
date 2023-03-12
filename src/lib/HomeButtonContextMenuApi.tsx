import { common, components } from "replugged";
import * as Types from "../types";
const { contextMenu: ContextMenuApi } = common;
const {
  ContextMenu: { ContextMenu, MenuItem },
} = components;
class HomeButtonContextMenuApi {
  items: Map<string, Types.ReactElement>;
  constructor() {
    this.items = new Map();
    this.openContextMenu = this.openContextMenu.bind(this);
  }
  addItem(id: string, item: Types.ReactElement) {
    this.items.set(id, item);
  }
  removeItem(id: string) {
    this.items.delete(id);
  }
  openContextMenu(event: Types.UIEvent) {
    const HomeButtonContextMenuItems = this.items.size
      ? Array.from(this.items.values())
          .filter(Boolean)
          .sort((a, b) => a?.props?.label?.localeCompare(b?.props?.label))
      : [
          <MenuItem
            {...{
              label: "♫ ⊂(｡◕‿‿◕｡⊂) ♪",
              id: "no-items",
            }}
          />,
        ];
    const HomeButtonContextMenu = (props: Types.ExtendedContextMenuArgs) => (
      <ContextMenu {...{ ...props, navId: "tharki" }}>{...HomeButtonContextMenuItems}</ContextMenu>
    );
    ContextMenuApi.open(event, ((e: Types.ContextMenuArgs) => (
      <HomeButtonContextMenu {...Object.assign({}, e, { onClose: ContextMenuApi.close })} />
    )) as unknown as Types.ContextMenu);
  }
}

export const HBCM = await new Promise<Types.HomeButtonContextMenuApi>((resolve, reject) => {
  try {
    if (Object.hasOwnProperty.call(window, "HomeButtonContextMenuApi"))
      resolve(window.HomeButtonContextMenuApi);
    else
      window.HomeButtonContextMenuApi =
        new HomeButtonContextMenuApi() as Types.HomeButtonContextMenuApi;
    resolve(window.HomeButtonContextMenuApi);
  } catch (error) {
    reject(error);
  }
});
