import axios, { AxiosResponse } from 'axios';
import FormData from 'form-data';
import { AI_ENDPOINT } from './Config.json'; 

export default {
    Caption: async (image: Buffer): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const fd = new FormData();
                fd.append("file", image, "image.jpeg");

                const result: AxiosResponse<{result: string}> = await axios({
                    method: 'POST',
                    url: `http://${AI_ENDPOINT}/caption`,
                    headers: fd.getHeaders(),
                    data: fd
                });
                // console.log(result.data);
                return resolve(result.data.result);
            } catch (err) {
                // console.log(err)
                return reject(err);
            }
        })
    },
    OCR: async (image: Buffer): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const fd = new FormData();
                fd.append("file", image, "image.jpeg");

                const result: AxiosResponse<{result: string}> = await axios({
                    method: 'POST',
                    url: `http://${AI_ENDPOINT}/ocr`,
                    headers: fd.getHeaders(),
                    data: fd
                });
                // console.log(result.data);
                return resolve(result.data.result);
            } catch (err) {
                // console.log(err)
                return reject(err);
            }
        })
    }
}