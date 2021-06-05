export interface Users {
    id: string;
    username: string;
    email: string;
    password?: string; // Not in DB table, just used for login & registration routes
    hashed: string;
    roles: string; // JSON stringified array of strings
    avatar?: string;
    visible: number;
    created_at: string;
    updated_at: string;
};

export interface Note {
    id: string;
    user_id: string;
    content: string;
    created_at?: string;
    updated_at?: string;
    pinned?: number;
}


export interface MySQL_Error {
    code?: string;
    errno?: number;
    sqlMessage?: string;
    sqlState?: string;
    index?: number;
    sql?: string;
};

export interface MySQL_Success {
    fieldCount?: number;
    affectedRows?: number;
    insertId?: number;
    serverStatus?: number;
    warningCount?: number;
    message?: string;
    protocol41?: boolean;
    changedRows?: number;
};

export type MySQL_Res = MySQL_Error & MySQL_Success;
