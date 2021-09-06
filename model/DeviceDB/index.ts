import DB from "../DB";
import { DefaultError, Device_DB } from "../Types";


export default {
    FindDevice: async (candleID: string): Promise<string[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await DB.GetConnection();

                const Devices = await db.collection('Devices').find<Device_DB>({candleID: candleID, code: -1}).toArray();
                if (Devices) {
                    let List: string[] = [];
                    for (const Device of Devices)
                        List.push(Device.mobileID);
                    return resolve(List);
                } else throw DefaultError.DB_FAIL;
            } catch (err) {
                return reject(err);
            }
        })
    }
}