import global from "../global";
import { DefaultError } from "../model/Types";

export interface Socket_Data_T {
    imageBuffer: string
}

export class NUGU_Response<T = any> {
    version: string = global.API_VERSION.toString()
    resultCode: string = "OK"
    output: T = {} as T
    constructor(output: T) {
        this.output = output;
    }
    toString(): string {
        let d = {
            version: this.version,
            resultCode: this.resultCode,
            output: this.output
        }
        return JSON.stringify(d);
    }
}

export interface NUGU_Request<T = any> {
    version: string
    action: {
        actionName: string
        parameters: T
    }
    event: {
        type: string
    }
    context: {
        session: {
            accessToken?: string
        }
        device: {
            type: string
            state?: any
        }
        privatePlay : { } // reserved
    }
    profile?: {
        privatePlay: {
            deviceUniqueId: string
            userKey: string
            deviceKey: string
        }
    }
}