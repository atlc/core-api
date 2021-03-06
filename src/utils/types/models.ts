export interface Users {
    id: string;
    username: string;
    email: string;
    password?: string; // Not in DB table, just used for login & registration routes
    hashed: string;
    roles: string; // JSON stringified array of strings
    avatar?: string;
    visible: number;
    verified: number;
    created_at: string;
    updated_at: string;
    sms_enabled: number;
    sms_verified: number;
    phone_number: string;
}

export interface Note {
    id: string;
    user_id: string;
    content: string;
    created_at?: string;
    updated_at?: string;
    pinned?: number;
}

export interface Bills {
    id?: number;
    utility_name?: string;
    type_id?: BillTypes["id"];
    amount: number;
    payment_date: Date | string;
}

export interface BillTypes {
    id: number;
    name: "internet" | "gas" | "electric" | "water";
}

export interface Tokens {
    id: string;
    user_id: string;
    created_at: number;
    expires_at: number;
}

export interface SMSCodes {
    id: string;
    user_id: string;
    created_at: number;
    expires_at: number;
}

export interface MySQL_Error {
    code?: string;
    errno?: number;
    sqlMessage?: string;
    sqlState?: string;
    index?: number;
    sql?: string;
}

export interface MySQL_Success {
    fieldCount?: number;
    affectedRows?: number;
    insertId?: number;
    serverStatus?: number;
    warningCount?: number;
    message?: string;
    protocol41?: boolean;
    changedRows?: number;
}

export type MySQL_Res = MySQL_Error & MySQL_Success;
