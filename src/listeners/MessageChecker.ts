import { MessageActions, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import { conditionalMenuItem } from "../Components/MenuItem";
import { HBCM } from "../lib/HomeButtonContextMenuApi";
export const MessageChecker = (dispatch): void => {
  if (
    dispatch.type === "MESSAGE_CREATE" &&
    SettingValues.get("onlyMentions", defaultSettings.onlyMentions) &&
    !MessageActions.getMessage(dispatch?.channelId, dispatch?.message?.id)?.mentioned
  )
    return;
  HBCM.addItem("MarkAllAsRead", conditionalMenuItem());
};
