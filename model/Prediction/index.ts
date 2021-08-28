import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import FormData from 'form-data';
import { AI_ENDPOINT, TRANSLATE } from './Config.json'; 

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
    },
    Translate_ENtoKO: async (text: string): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                let info: AxiosRequestConfig = {
                    method: "POST",
                    url: TRANSLATE.ENDPOINT,
                    data: {
                        source: "en",
                        target: "ko",
                        text: text
                    },
                    headers: {'X-Naver-Client-Id':TRANSLATE.client_id, 'X-Naver-Client-Secret': TRANSLATE.client_secret}
                }

                const translateResult: AxiosResponse<{code?: string, errorCode?: string, message: {result: string}}> = await axios(info);
                // console.log(translateResult.data);
                if (translateResult.data.code || translateResult.data.errorCode) return reject(translateResult.data.code);
                else return resolve(translateResult.data.message.result);
                // request.post(info, (err, request, body) => {
                //     if (err) return resolve({err: err});

                //     let data = JSON.parse(body);
                    
                    
                //     if (data.code || data.errorCode) return resolve({err: body});
                //     return resolve(data.message.result);
                // });
            } catch (err) {
                console.log("translateerr", err);
                return reject(err);
            }
        })
    }
}