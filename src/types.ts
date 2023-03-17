import { types as DefaultTypes } from "replugged";
export { types as DefaultTypes } from "replugged";
export { ReactElement, ComponentClass, UIEvent } from "react";
import { ComponentClass, ReactElement } from "react";
declare global {
  interface Window {
    HomeButtonContextMenuApi: HomeButtonContextMenuApi;
  }
}
export interface ContextMenuArgs {
  className: string;
  config: { context: string };
  context: string;
  onHeightUpdate: DefaultTypes.AnyFunction;
  position: null | number;
  target: HTMLElement;
  theme: string;
}
export interface ExtendedContextMenuArgs extends ContextMenuArgs {
  onClose: DefaultTypes.AnyFunction;
}
export interface ContextMenu {
  close: DefaultTypes.AnyFunction;
  open: (
    event: React.UIEvent,
    render?: ContextMenu,
    options?: { enableSpellCheck?: boolean },
    renderLazy?: Promise<ContextMenu>,
  ) => void;
  openLazy: (
    event: React.UIEvent,
    renderLazy?: Promise<ContextMenu>,
    options?: { enableSpellCheck?: boolean },
  ) => void;
}
export interface HomeButtonContextMenuApi {
  items?: Map<string, ReactElement>;
  constructor?: DefaultTypes.AnyFunction;
  addItem?: DefaultTypes.AnyFunction;
  removeItem?: DefaultTypes.AnyFunction;
  forceUpdate?: DefaultTypes.AnyFunction;
  openContextMenu?: DefaultTypes.AnyFunction;
}
export interface GenericModule {
  [key: string]: DefaultTypes.AnyFunction;
}
export interface ReadStateByChannelValue {
  ackMessageIdAtChannelSelect: null | string;
  ackPinTimestamp: number;
  channelId: string;
  estimated: boolean;
  isManualAck: boolean;
  lastPinTimestamp: number;
  loadedMessages: boolean;
  oldestUnreadMessageIdStale: boolean;
  outgoingAck: null | string;
  outgoingAckTimer: null | string;
  type: number;
  _ackMessageId: string;
  _ackMessageTimestamp: number;
  _guildId: string;
  _isActiveThread: boolean;
  _isJoinedThread: boolean;
  _isThread: boolean;
  _lastMessageId: string;
  _lastMessageTimestamp: number;
  _mentionCount: number;
  _oldestUnreadMessageId: string;
  _persisted: boolean;
  _unreadCount: number;
  ackMessageId: string;
  guildId: string;
  lastMessageId: string;
  mentionCount: number;
  oldestUnreadMessageId: string;
  oldestUnreadTimestamp: number;
  unreadCount: number;
}

export interface ReadStateByChannel {
  [key: string]: ReadStateByChannelValue;
}
export interface AllReadStates {
  ackPinTimestamp: number;
  channelId: string;
  lastPinTimestamp: number;
  type: number;
  _ackMessageId: string;
  _ackMessageTimestamp: number;
  _guildId: null | string;
  _lastMessageId: string;
  _lastMessageTimestamp: number;
  _mentionCount: number;
  _persisted: boolean;
}
export interface ReadStateStore {
  ackMessageId: DefaultTypes.AnyFunction;
  getAllReadStates: () => AllReadStates[];
  getForDebugging: DefaultTypes.AnyFunction;
  getGuildChannelUnreadState: DefaultTypes.AnyFunction;
  getMentionCount: DefaultTypes.AnyFunction;
  getOldestUnreadMessageId: DefaultTypes.AnyFunction;
  getOldestUnreadTimestamp: DefaultTypes.AnyFunction;
  getReadStatesByChannel: () => ReadStateByChannel;
  getTrackedAckMessageId: DefaultTypes.AnyFunction;
  getUnreadCount: DefaultTypes.AnyFunction;
  hasNotableUnread: DefaultTypes.AnyFunction;
  hasOpenedThread: DefaultTypes.AnyFunction;
  hasRecentlyVisitedAndRead: DefaultTypes.AnyFunction;
  hasRelevantUnread: DefaultTypes.AnyFunction;
  hasTrackedUnread: DefaultTypes.AnyFunction;
  hasUnread: (channel: string) => boolean;
  hasUnreadPins: DefaultTypes.AnyFunction;
  initialize: DefaultTypes.AnyFunction;
  isEstimated: DefaultTypes.AnyFunction;
  isForumPostUnread: DefaultTypes.AnyFunction;
  isNewForumThread: DefaultTypes.AnyFunction;
  lastMessageId: DefaultTypes.AnyFunction;
  lastPinTimestamp: DefaultTypes.AnyFunction;
  addChangeListener: DefaultTypes.AnyFunction;
  removeChangeListener: DefaultTypes.AnyFunction;
}
export interface Channel {
  defaultAutoArchiveDuration: undefined | number;
  defaultThreadRateLimitPerUser: undefined | number;
  flags_: number;
  id: string;
  lastMessageId: string;
  lastPinTimestamp: string;
  memberListId: undefined | string;
  name: string;
  nsfw_: boolean;
  permissionOverwrites_: {
    [key: string | number]: {
      allow: bigint;
      deny: bigint;
      id: string;
      type: number;
    };
  };
  guild_id: string;
  position_: number;
  rateLimitPerUser_: number;
  topic_: string;
  type: number;
  version: undefined | number;
  accessPermissions: bigint;
  bitrate: number;
  flags: number;
  nsfw: boolean;
  permissionOverwrites: {
    [key: string | number]: {
      allow: bigint;
      deny: bigint;
      id: string;
      type: number;
    };
  };
  position: number;
  rateLimitPerUser: number;
  topic: undefined | string;
  userLimit: number;
  availableTags: Array<{
    name: string;
  }>;
  isHidden: () => boolean;
  isGuildVocal: () => boolean;
  isDM: () => boolean;
  getGuildId: () => string;
  isGroupDM: () => boolean;
}
export interface ChannelStore {
  getAllThreadsForParent: DefaultTypes.AnyFunction;
  getBasicChannel: DefaultTypes.AnyFunction;
  getCachedChannelJsonForGuild: DefaultTypes.AnyFunction;
  getChannel: (e: string) => Channel;
  getDMFromUserId: DefaultTypes.AnyFunction;
  getDMUserIds: DefaultTypes.AnyFunction;
  getGuildChannelsVersion: DefaultTypes.AnyFunction;
  getInitialOverlayState: DefaultTypes.AnyFunction;
  getMutableBasicGuildChannelsForGuild: DefaultTypes.AnyFunction;
  getMutableGuildChannelsForGuild: DefaultTypes.AnyFunction;
  getMutablePrivateChannels: DefaultTypes.AnyFunction;
  getPrivateChannelsVersion: DefaultTypes.AnyFunction;
  getSortedPrivateChannels: DefaultTypes.AnyFunction;
  hasChannel: DefaultTypes.AnyFunction;
  hasRestoredGuild: DefaultTypes.AnyFunction;
  initialize: DefaultTypes.AnyFunction;
  loadAllGuildAndPrivateChannelsFromDisk: DefaultTypes.AnyFunction;
}
export interface Guild {
  afkChannelId: null | string;
  afkTimeout: number;
  applicationCommandCounts: {
    [key: number]: number;
  };
  application_id: null | string;
  banner: string;
  defaultMessageNotifications: number;
  description: string;
  discoverySplash: null | boolean;
  explicitContentFilter: number;
  features: Set<string>;
  homeHeader: null | string;
  hubType: null | number;
  icon: string;
  id: string;
  joinedAt: Date;
  latestOnboardingQuestionId: null | string;
  maxMembers: number;
  maxStageVideoChannelUsers: number;
  maxVideoChannelUsers: number;
  mfaLevel: number;
  name: string;
  nsfwLevel: number;
  ownerId: string;
  preferredLocale: string;
  premiumProgressBarEnabled: boolean;
  premiumSubscriberCount: number;
  premiumTier: number;
  publicUpdatesChannelId: string;
  roles: {
    [key: string]: object;
  };
  rulesChannelId: string;
  safetyAlertsChannelId: null | string;
  splash: null | string;
  systemChannelFlags: number;
  systemChannelId: string;
  vanityURLCode: string;
  verificationLevel: number;
  acronym: string;
  getApplicationId: DefaultTypes.AnyFunction;
  getIconSource: DefaultTypes.AnyFunction;
  getIconURL: DefaultTypes.AnyFunction;
  getMaxEmojiSlots: DefaultTypes.AnyFunction;
  getMaxRoleSubscriptionEmojiSlots: DefaultTypes.AnyFunction;
  getRole: DefaultTypes.AnyFunction;
  hasCommunityInfoSubheader: DefaultTypes.AnyFunction;
  hasFeature: DefaultTypes.AnyFunction;
  hasVerificationGate: DefaultTypes.AnyFunction;
  isLurker: DefaultTypes.AnyFunction;
  isNew: DefaultTypes.AnyFunction;
  isOwner: DefaultTypes.AnyFunction;
  isOwnerWithRequiredMfaLevel: DefaultTypes.AnyFunction;
  toString: DefaultTypes.AnyFunction;
}
export interface GuildStore {
  getGuild: (guildId: string) => Guild;
  getGuildCount: DefaultTypes.AnyFunction;
  getGuilds: DefaultTypes.AnyFunction;
  isLoaded: DefaultTypes.AnyFunction;
}
export interface User {
  avatar: string;
  avatarDecoration: undefined | string;
  bot: boolean;
  desktop: boolean;
  discriminator: string;
  email: null | string;
  flags: number;
  guildMemberAvatars: {
    [key: number]: string;
  };
  hasBouncedEmail: boolean;
  hasFlag: DefaultTypes.AnyFunction;
  id: string;
  isStaff: DefaultTypes.AnyFunction;
  isStaffPersonal: DefaultTypes.AnyFunction;
  mfaEnabled: boolean;
  mobile: boolean;
  nsfwAllowed: undefined | boolean;
  personalConnectionId: null | string;
  phone: null | string;
  premiumType: undefined | number;
  premiumUsageFlags: number;
  publicFlags: number;
  purchasedFlags: number;
  system: boolean;
  username: string;
  verified: boolean;
  createdAt: Date;
  tag: string;
}
export interface AssetUtils {
  getAnimatableSourceWithFallback: DefaultTypes.AnyFunction;
  getApplicationIconSource: DefaultTypes.AnyFunction;
  getApplicationIconURL: DefaultTypes.AnyFunction;
  getAvatarDecorationURL: DefaultTypes.AnyFunction;
  getChannelIconSource: DefaultTypes.AnyFunction;
  getChannelIconURL: (Channel: Channel) => string;
  getDefaultAvatarURL: (number: number) => string;
  getEmojiURL: DefaultTypes.AnyFunction;
  getGameAssetSource: DefaultTypes.AnyFunction;
  getGameAssetURL: DefaultTypes.AnyFunction;
  getGuildBannerSource: DefaultTypes.AnyFunction;
  getGuildBannerURL: DefaultTypes.AnyFunction;
  getGuildDiscoverySplashSource: DefaultTypes.AnyFunction;
  getGuildDiscoverySplashURL: DefaultTypes.AnyFunction;
  getGuildHomeHeaderSource: DefaultTypes.AnyFunction;
  getGuildHomeHeaderURL: DefaultTypes.AnyFunction;
  getGuildIconSource: DefaultTypes.AnyFunction;
  getGuildIconURL: (Guild: Guild) => string;
  getGuildMemberAvatarSource: DefaultTypes.AnyFunction;
  getGuildMemberAvatarURL: DefaultTypes.AnyFunction;
  getGuildMemberAvatarURLSimple: DefaultTypes.AnyFunction;
  getGuildMemberBannerURL: DefaultTypes.AnyFunction;
  getGuildSplashSource: DefaultTypes.AnyFunction;
  getGuildSplashURL: DefaultTypes.AnyFunction;
  getGuildTemplateIconSource: DefaultTypes.AnyFunction;
  getGuildTemplateIconURL: DefaultTypes.AnyFunction;
  getUserAvatarColor: DefaultTypes.AnyFunction;
  getUserAvatarSource: DefaultTypes.AnyFunction;
  getUserAvatarURL: (User: User) => string;
  getUserBannerURL: DefaultTypes.AnyFunction;
  getVideoFilterAssetURL: DefaultTypes.AnyFunction;
  hasAnimatedGuildIcon: DefaultTypes.AnyFunction;
  isAnimatedIconHash: DefaultTypes.AnyFunction;
  makeSource: DefaultTypes.AnyFunction;
}
export interface Unread {
  channelId: string;
  messageId: string;
}
export interface Unreads {
  DMs: Unread[];
  GuildChannels: Unread[];
  All: Unread[];
}
export interface blacklist {
  value: boolean;
  onChange: (newValue: boolean) => void;
}
export interface SwitchItem extends ComponentClass {
  value: boolean;
  onChange: (e: boolean) => void;
  note?: string;
  tooltipNote?: string;
  disabled?: boolean;
  hideBorder?: boolean;
  style?: React.CSSProperties;
  className?: string;
  children?: ReactElement;
}
export interface IconSwitch extends SwitchItem {
  title: string;
  icon?: string;
}
export interface Settings {
  blacklistedServers: {
    [key: string]: boolean;
  };
  blacklistedDMs: {
    [key: string]: boolean;
  };
  onlyMentions: boolean;
  showToast: boolean;
  showForever: boolean;
}
