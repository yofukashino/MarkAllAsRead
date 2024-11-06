import { contextMenu as ContextMenuApi } from "replugged/common";
import { ContextMenu } from "replugged/components";
export default class HomeButtonContextMenuApi {
  items: Map<string, React.ReactElement | (() => React.ReactElement)>;
  constructor() {
    this.items = new Map();
    this.openContextMenu = this.openContextMenu.bind(this);
  }
  addItem(id: string, item: React.ReactElement | (() => React.ReactElement)) {
    this.items.set(id, item);
  }
  removeItem(id: string) {
    this.items.delete(id);
  }
  openContextMenu(event: React.MouseEvent) {
    const HomeButtonContextMenu = (props) => {
      const HomeButtonContextMenuItems = this.items.size
        ? Array.from(this.items.values())
            .map((i) => (typeof i === "function" ? i() : i))
            .filter(Boolean)
            .sort((a, b) => a?.props?.label?.localeCompare(b?.props?.label))
        : [];
      return (
        <ContextMenu.ContextMenu {...props} navId="yofukashino">
          {...HomeButtonContextMenuItems}
        </ContextMenu.ContextMenu>
      );
    };
    ContextMenuApi.open(event, (props) => (
      <HomeButtonContextMenu {...props} onClose={ContextMenuApi.close} />
    ));
  }
  static getAPI(): HomeButtonContextMenuApi {
    window[Symbol.for("HomeButtonContextMenuApi")] ??= new HomeButtonContextMenuApi();
    return window[Symbol.for("HomeButtonContextMenuApi")];
  }
}
