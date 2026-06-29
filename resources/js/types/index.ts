export type User = {
    id: number;
    username: string;
    avatar?: string;
};

export type Comment = {
    id: number;
    content: string;
    created_at: number;
    commenter: User;
};

export type Relation = {
    id: number;
    sender: number;
    status: 'pending' | 'blocked' | 'accepted';
};

export type OtherUser = User & {
    relation?: Relation;
};

export type Settings = {
    dataPermissions: boolean;
    disableSound: boolean;
    disableNotifications: boolean;
};

export type Auth = {
    user?: User;
    settings?: Settings;
}

export type Game = {
    id: number;
    ended: boolean
    moves: string;
    white_user_id: number;
    black_user_id: number;
    winner_id: number;
}

enum SettingValues {
    DATA_PERMISSIONS = 1,
    DISABLE_SOUND = 2,
    DISABLE_NOTIFICATIONS = 4,
}

export function BitmapToSettings(bitmap: number): Settings {
    return {
        dataPermissions: (bitmap & SettingValues.DATA_PERMISSIONS) !== 0,
        disableSound: (bitmap & SettingValues.DISABLE_SOUND) !== 0,
        disableNotifications: (bitmap & SettingValues.DISABLE_NOTIFICATIONS) !== 0,
    };
}

export function SettingsToBitmap(settings: Settings): number {
    let bitmap = 0;

    if (settings.dataPermissions) bitmap |= SettingValues.DATA_PERMISSIONS;

    if (settings.disableSound) bitmap |= SettingValues.DISABLE_SOUND;

    if (settings.disableNotifications) bitmap |= SettingValues.DISABLE_NOTIFICATIONS;

    return bitmap;
}
