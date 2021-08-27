import DB from "../DB";
import { DefaultError, Device_DB } from "../Types";


export default {
    FindDevice: async (candleID: string): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await DB.GetConnection();

                const Device = await db.collection('Devices').findOne<Device_DB>({candleID: candleID, code: -1});
                if (Device) return resolve(Device.mobileID);
                else throw DefaultError.DB_FAIL;
            } catch (err) {
                return reject(err);
            }
        })
    }
}