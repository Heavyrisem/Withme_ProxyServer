import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import FormData from 'form-data';
import Josa from 'josa-js';
import { AI_ENDPOINT, TRANSLATE } from './Config.json'; 

export default {
    Caption: async (image: Buffer): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const fd = new FormData();
                fd.append("file", image, "image.jpeg");
                let timer = Date.now();
                const result: AxiosResponse<{result: string}> = await axios({
                    method: 'POST',
                    url: `http://${AI_ENDPOINT}/caption`,
                    headers: fd.getHeaders(),
                    data: fd
                });
                // console.log(result.data);
                console.log("Caption Server", Date.now() - timer, 'ms');
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
                let timer = Date.now();

                const result: AxiosResponse<{result: string}> = await axios({
                    method: 'POST',
                    url: `http://${AI_ENDPOINT}/ocr`,
                    headers: fd.getHeaders(),
                    data: fd
                });
                // console.log(result.data);
                console.log("OCR Server", Date.now() - timer, 'ms');
                return resolve(result.data.result);
            } catch (err) {
                // console.log(err)
                return reject(err);
            }
        })
    },
    Translate_ENtoKO: async (text: string): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            let timer = Date.now();
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

                const translateResult: AxiosResponse<{code?: string, errorCode?: string, message: {result: {translatedText: string}}}> = await axios(info);
                // console.log(translateResult.data);
                if (translateResult.data.code || translateResult.data.errorCode) return reject(translateResult.data.code);
                else {
                    let result = translateResult.data.message.result.translatedText.replace(".", "").split(" ");
                    let lastWord = result.pop() as string;
                    
                    if (lastWord.indexOf("있") != -1) result.push(lastWord.substring(0, lastWord.indexOf("있"))+"있어요.");
                    else result.push(lastWord + Josa.c(lastWord, "이/가") + " 보이네요.");
                    // result.push(lastWord);
                    // console.log(lastWord, result);
                    console.log("Translate API", Date.now() - timer, 'ms');
                    return resolve(result.join(" "));
                }
            } catch (err) {
                console.log("translateerr", err);
                return reject(err);
            }
        })
    }
}