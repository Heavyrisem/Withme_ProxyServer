import axios, { AxiosResponse } from 'axios';
import DB from '../DB';
import { AI_ENDPOINT } from './Config.json'; 

export default {
    Caption: async (image: Buffer): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await DB.GetConnection();

                const fd = new FormData();
                fd.append("file", new Blob([new Uint8Array(image, image.byteOffset, image.length)]), "image");

                const reuslt: AxiosResponse<{reuslt: string}> = await axios({
                    method: 'POST',
                    url: AI_ENDPOINT,
                    headers: {'Content-Type': 'multipart/form-data'},
                    data: fd
                });
                
                return resolve(reuslt.data.reuslt);
            } catch (err) {
                return reject(err);
            }
        })
    }
}