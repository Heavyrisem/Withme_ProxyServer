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

                const translateResult: AxiosResponse<{code?: string, errorCode?: string, message: {result: {translatedText: string}}}> = await axios(info);
                // console.log(translateResult.data);
                if (translateResult.data.code || translateResult.data.errorCode) return reject(translateResult.data.code);
                else {
                    let result = translateResult.data.message.result.translatedText.replace(".", "").split(" ");
                    let lastWord = result.reverse()[0];
                    result.pop();

                    if (lastWord.endsWith("다")) lastWord = lastWord.replace("다", "어요");
                    else lastWord += Josa.c(lastWord, "이/가") + " 보이네요.";
                    result.push(lastWord)
                    return resolve(result.join(" "));
                }
            } catch (err) {
                console.log("translateerr", err);
                return reject(err);
            }
        })
    }
}