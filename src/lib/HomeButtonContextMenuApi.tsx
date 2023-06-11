import { common, components } from "replugged";
import * as Types from "../types";
const { contextMenu: ContextMenuApi } = common;
const {
  ContextMenu: { ContextMenu },
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
  openContextMenu(event: Types.MouseEvent) {
    const HomeButtonContextMenuItems = this.items.size
      ? Array.from(this.items.values())
          .filter(Boolean)
          .sort((a, b) => a?.props?.label?.localeCompare(b?.props?.label))
      : [];
    const HomeButtonContextMenu = (props) => (
      <ContextMenu {...{ ...props, navId: "tharki" }}>{...HomeButtonContextMenuItems}</ContextMenu>
    );
    ContextMenuApi.open(event, (e) => (
      <HomeButtonContextMenu {...Object.assign({}, e, { onClose: ContextMenuApi.close })} />
    ));
  }
}

export default await new Promise<Types.HomeButtonContextMenuApi>((resolve, reject) => {
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
