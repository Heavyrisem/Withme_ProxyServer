export interface Device_DB {
    code: number
    mobileID: string
    candleID?: string
}


export enum DefaultError {
    DB_FAIL = 1,
    INVAILD_PARAMS
}