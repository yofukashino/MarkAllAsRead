import { types } from "replugged";
import GeneralDiscordTypes from "discord-types/general";
import type HBCM from "./lib/HomeButtonContextMenuApi";
export namespace Types {
  export import DefaultTypes = types;
  export type GenericModule = Record<string, DefaultTypes.AnyFunction>;
  export type Channel = GeneralDiscordTypes.Channel;
  export type Guild = GeneralDiscordTypes.Guild;
  export type Role = GeneralDiscordTypes.Role;
  export type User = GeneralDiscordTypes.User & { globalName?: string };
  export interface IconUtils {
    DEFAULT_AVATARS: string[];
    SUPPORTS_WEBP: boolean;
    default: {
      getAnimatableSourceWithFallback: DefaultTypes.AnyFunction;
      getApplicationIconSource: DefaultTypes.AnyFunction;
      getApplicationIconURL: DefaultTypes.AnyFunction;
      getAvatarDecorationURL: DefaultTypes.AnyFunction;
      getChannelIconSource: DefaultTypes.AnyFunction;
      getChannelIconURL: DefaultTypes.AnyFunction;
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
      getUserAvatarURL: DefaultTypes.AnyFunction;
      getUserBannerURL: DefaultTypes.AnyFunction;
      getVideoFilterAssetURL: DefaultTypes.AnyFunction;
      hasAnimatedGuildIcon: DefaultTypes.AnyFunction;
      isAnimatedIconHash: DefaultTypes.AnyFunction;
      makeSource: DefaultTypes.AnyFunction;
    };
    getAvatarDecorationURL: DefaultTypes.AnyFunction;
    getEmojiURL: DefaultTypes.AnyFunction;
    getGuildMemberAvatarURL: DefaultTypes.AnyFunction;
    getGuildMemberAvatarURLSimple: DefaultTypes.AnyFunction;
    getGuildMemberBannerURL: DefaultTypes.AnyFunction;
    getUserAvatarURL: DefaultTypes.AnyFunction;
    getUserBannerURL: DefaultTypes.AnyFunction;
    getVideoFilterAssetURL: DefaultTypes.AnyFunction;
    isAnimatedIconHash: DefaultTypes.AnyFunction;
    isAnimatedImageURL: DefaultTypes.AnyFunction;
    isVideoAssetHash: DefaultTypes.AnyFunction;
  }
  export interface BigIntUtils {
    add: DefaultTypes.AnyFunction;
    combine: DefaultTypes.AnyFunction;
    deserialize: DefaultTypes.AnyFunction;
    equals: DefaultTypes.AnyFunction;
    filter: DefaultTypes.AnyFunction;
    getFlag: DefaultTypes.AnyFunction;
    has: DefaultTypes.AnyFunction;
    hasAny: DefaultTypes.AnyFunction;
    invert: DefaultTypes.AnyFunction;
    remove: DefaultTypes.AnyFunction;
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

  export type ReadStateByChannel = Record<string, ReadStateByChannelValue>;
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
  export interface GuildStore {
    getGuild: (guildId: string) => Guild;
    getGuildCount: DefaultTypes.AnyFunction;
    getGuilds: DefaultTypes.AnyFunction;
    isLoaded: DefaultTypes.AnyFunction;
  }
  export interface AckUtils {
    ack: DefaultTypes.AnyFunction;
    ackChannel: DefaultTypes.AnyFunction;
    ackGuildFeature: DefaultTypes.AnyFunction;
    ackUserFeature: DefaultTypes.AnyFunction;
    bulkAck: DefaultTypes.AnyFunction;
    disableAutomaticAck: DefaultTypes.AnyFunction;
    enableAutomaticAck: DefaultTypes.AnyFunction;
    localAck: DefaultTypes.AnyFunction;
  }
  export interface Unread {
    channelId: string;
    messageId: string;
  }
  export interface IconSwitch {
    title: string;
    icon?: string;
    value: boolean;
    onChange: (e: boolean) => void;
    note?: string;
    tooltipNote?: string;
    disabled?: boolean;
    hideBorder?: boolean;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactElement;
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
  export interface SwitchItem extends React.ComponentClass {
    value: boolean;
    onChange: (e: boolean) => void;
    note?: string;
    tooltipNote?: string;
    disabled?: boolean;
    hideBorder?: boolean;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactElement;
  }

  export interface PopoutList extends React.ComponentClass {
    Divider: React.ComponentClass;
    Empty: React.ComponentClass;
    Item: React.ComponentClass;
    SearchBar: React.ComponentClass<{
      autoFocus?: boolean;
      placeholder?: string;
      query?: string;
      onChange?: (query: string) => void;
      onClear?: () => void;
    }>;
  }
  export interface DiscordComponents {
    AdvancedScroller: React.ComponentClass;
    AdvancedScrollerAuto: React.ComponentClass;
    AdvancedScrollerNone: React.ComponentClass;
    AdvancedScrollerThin: React.ComponentClass;
    PopoutList: PopoutList;
    Scroller: React.ComponentClass;
    ScrollerAuto: React.ComponentClass;
    ScrollerNone: React.ComponentClass;
    ScrollerThin: React.ComponentClass;
  }
  export type Jsonifiable =
    | null
    | undefined
    | boolean
    | number
    | string
    | Jsonifiable[]
    | { [key: string]: Jsonifiable };
  export type ValType<T> =
    | T
    | React.ChangeEvent<HTMLInputElement>
    | (Record<string, unknown> & { value?: T; checked?: T });

  export type NestedType<T, P> = P extends `${infer Left}.${infer Right}`
    ? Left extends keyof T
      ? NestedType<T[Left], Right>
      : Left extends `${infer FieldKey}[${infer IndexKey}]`
      ? FieldKey extends keyof T
        ? NestedType<Exclude<T[FieldKey], undefined> extends infer U ? U : never, IndexKey>
        : undefined
      : undefined
    : P extends keyof T
    ? T[P]
    : P extends `${infer FieldKey}[${infer _IndexKey}]`
    ? FieldKey extends keyof T
      ? Exclude<T[FieldKey], undefined> extends infer U
        ? U
        : never
      : undefined
    : undefined;

  export interface Settings {
    blacklistedServers: Record<string, boolean>;
    blacklistedDMs: Record<string, boolean>;
    onlyMentions: boolean;
    showToast: boolean;
    showForever: boolean;
  }
}
export default Types;

declare global {
  interface Window {
    HomeButtonContextMenuApi: HBCM;
  }
  export const DiscordNative: {
    accessibility: {
      isAccessibilitySupportEnabled: Types.DefaultTypes.AnyFunction;
    };
    app: {
      dock: {
        setBadge: Types.DefaultTypes.AnyFunction;
        bounce: Types.DefaultTypes.AnyFunction;
        cancelBounce: Types.DefaultTypes.AnyFunction;
      };
      getBuildNumber: Types.DefaultTypes.AnyFunction;
      getDefaultDoubleClickAction: Types.DefaultTypes.AnyFunction;
      getModuleVersions: Types.DefaultTypes.AnyFunction;
      getPath: Types.DefaultTypes.AnyFunction;
      getReleaseChannel: Types.DefaultTypes.AnyFunction;
      getVersion: Types.DefaultTypes.AnyFunction;
      registerUserInteractionHandler: Types.DefaultTypes.AnyFunction;
      relaunch: Types.DefaultTypes.AnyFunction;
      setBadgeCount: Types.DefaultTypes.AnyFunction;
    };
    clipboard: {
      copy: Types.DefaultTypes.AnyFunction;
      copyImage: Types.DefaultTypes.AnyFunction;
      cut: Types.DefaultTypes.AnyFunction;
      paste: Types.DefaultTypes.AnyFunction;
      read: Types.DefaultTypes.AnyFunction;
    };
    clips: {
      deleteClip: Types.DefaultTypes.AnyFunction;
      loadClip: Types.DefaultTypes.AnyFunction;
      loadClipsDirectory: Types.DefaultTypes.AnyFunction;
    };
    crashReporter: {
      getMetadata: Types.DefaultTypes.AnyFunction;
      updateCrashReporter: Types.DefaultTypes.AnyFunction;
    };
    desktopCapture: {
      getDesktopCaptureSources: Types.DefaultTypes.AnyFunction;
    };
    features: {
      declareSupported: Types.DefaultTypes.AnyFunction;
      supports: Types.DefaultTypes.AnyFunction;
    };
    fileManager: {
      basename: Types.DefaultTypes.AnyFunction;
      cleanupTempFiles: Types.DefaultTypes.AnyFunction;
      dirname: Types.DefaultTypes.AnyFunction;
      extname: Types.DefaultTypes.AnyFunction;
      getModuleDataPathSync: Types.DefaultTypes.AnyFunction;
      getModulePath: Types.DefaultTypes.AnyFunction;
      join: Types.DefaultTypes.AnyFunction;
      openFiles: Types.DefaultTypes.AnyFunction;
      readLogFiles: Types.DefaultTypes.AnyFunction;
      readTimeSeriesLogFiles: Types.DefaultTypes.AnyFunction;
      saveWithDialog: Types.DefaultTypes.AnyFunction;
      showItemInFolder: Types.DefaultTypes.AnyFunction;
      showOpenDialog: Types.DefaultTypes.AnyFunction;
    };
    gpuSettings: {
      getEnableHardwareAcceleration: Types.DefaultTypes.AnyFunction;
      setEnableHardwareAcceleration: Types.DefaultTypes.AnyFunction;
    };
    http: {
      getAPIEndpoint: Types.DefaultTypes.AnyFunction;
      makeChunkedRequest: Types.DefaultTypes.AnyFunction;
    };
    ipc: {
      invoke: Types.DefaultTypes.AnyFunction;
      on: Types.DefaultTypes.AnyFunction;
      send: Types.DefaultTypes.AnyFunction;
    };
    isRenderer: boolean;
    nativeModules: {
      canBootstrapNewUpdater: boolean;
      ensureModule: Types.DefaultTypes.AnyFunction;
      requireModule: Types.DefaultTypes.AnyFunction;
    };
    os: {
      arch: string;
      release: string;
    };
    powerMonitor: {
      getSystemIdleTimeMs: Types.DefaultTypes.AnyFunction;
      on: Types.DefaultTypes.AnyFunction;
      removeAllListeners: Types.DefaultTypes.AnyFunction;
      removeListener: Types.DefaultTypes.AnyFunction;
    };
    powerSaveBlocker: {
      blockDisplaySleep: Types.DefaultTypes.AnyFunction;
      cleanupDisplaySleep: Types.DefaultTypes.AnyFunction;
      unblockDisplaySleep: Types.DefaultTypes.AnyFunction;
    };
    process: {
      arch: string;
      env: object;
      platform: string;
    };
    processUtils: {
      flushCookies: Types.DefaultTypes.AnyFunction;
      flushDNSCache: Types.DefaultTypes.AnyFunction;
      flushStorageData: Types.DefaultTypes.AnyFunction;
      getCPUCoreCount: Types.DefaultTypes.AnyFunction;
      getCurrentCPUUsagePercent: Types.DefaultTypes.AnyFunction;
      getCurrentMemoryUsageKB: Types.DefaultTypes.AnyFunction;
      getLastCrash: Types.DefaultTypes.AnyFunction;
      getMainArgvSync: Types.DefaultTypes.AnyFunction;
      purgeMemory: Types.DefaultTypes.AnyFunction;
    };
    remoteApp: {
      dock: {
        setBadge: Types.DefaultTypes.AnyFunction;
        bounce: Types.DefaultTypes.AnyFunction;
        cancelBounce: Types.DefaultTypes.AnyFunction;
      };
      getBuildNumber: Types.DefaultTypes.AnyFunction;
      getDefaultDoubleClickAction: Types.DefaultTypes.AnyFunction;
      getModuleVersions: Types.DefaultTypes.AnyFunction;
      getPath: Types.DefaultTypes.AnyFunction;
      getReleaseChannel: Types.DefaultTypes.AnyFunction;
      getVersion: Types.DefaultTypes.AnyFunction;
      registerUserInteractionHandler: Types.DefaultTypes.AnyFunction;
      relaunch: Types.DefaultTypes.AnyFunction;
      setBadgeCount: Types.DefaultTypes.AnyFunction;
    };
    remotePowerMonitor: {
      getSystemIdleTimeMs: Types.DefaultTypes.AnyFunction;
      on: Types.DefaultTypes.AnyFunction;
      removeAllListeners: Types.DefaultTypes.AnyFunction;
      removeListener: Types.DefaultTypes.AnyFunction;
    };
    safeStorage: {
      decryptString: Types.DefaultTypes.AnyFunction;
      encryptString: Types.DefaultTypes.AnyFunction;
      isEncryptionAvailable: Types.DefaultTypes.AnyFunction;
    };
    setUncaughtExceptionHandler: Types.DefaultTypes.AnyFunction;
    settings: {
      get: Types.DefaultTypes.AnyFunction;
      getSync: Types.DefaultTypes.AnyFunction;
      set: Types.DefaultTypes.AnyFunction;
    };
    spellCheck: {
      getAvailableDictionaries: Types.DefaultTypes.AnyFunction;
      on: Types.DefaultTypes.AnyFunction;
      removeListener: Types.DefaultTypes.AnyFunction;
      replaceMisspelling: Types.DefaultTypes.AnyFunction;
      setLearnedWords: Types.DefaultTypes.AnyFunction;
      setLocale: Types.DefaultTypes.AnyFunction;
    };
    thumbar: { setThumbarButtons: Types.DefaultTypes.AnyFunction };
    userDataCache: {
      cacheUserData: Types.DefaultTypes.AnyFunction;
      deleteCache: Types.DefaultTypes.AnyFunction;
      getCached: Types.DefaultTypes.AnyFunction;
    };
    window: {
      USE_OSX_NATIVE_TRAFFIC_LIGHTS: boolean;
      blur: Types.DefaultTypes.AnyFunction;
      close: Types.DefaultTypes.AnyFunction;
      flashFrame: Types.DefaultTypes.AnyFunction;
      focus: Types.DefaultTypes.AnyFunction;
      fullscreen: Types.DefaultTypes.AnyFunction;
      isAlwaysOnTop: Types.DefaultTypes.AnyFunction;
      maximize: Types.DefaultTypes.AnyFunction;
      minimize: Types.DefaultTypes.AnyFunction;
      restore: Types.DefaultTypes.AnyFunction;
      setAlwaysOnTop: Types.DefaultTypes.AnyFunction;
      setBackgroundThrottling: Types.DefaultTypes.AnyFunction;
      setDevtoolsCallbacks: Types.DefaultTypes.AnyFunction;
      setProgressBar: Types.DefaultTypes.AnyFunction;
      setZoomFactor: Types.DefaultTypes.AnyFunction;
    };
  };
}
