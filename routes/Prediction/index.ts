import { Request, Response, Router } from "express";
import middleware from "../../middleware";
import Prediction from "../../model/Prediction";
import * as googleTTS from 'google-tts-api';


const router = Router();

const Predict = async (req: Request<any,any,{imageData: string}>, res: Response) => {
    let textResult = "";
    if (req.body.imageData) {
        console.log("base64 length", req.body.imageData.length);

        try {
            let result;
            switch (req.url) {
                case "/caption": result = await Prediction.Caption(Buffer.from(req.body.imageData, "base64")); break;
                case "/ocr": result = await Prediction.OCR(Buffer.from(req.body.imageData, "base64")); break;
                default: textResult = `${req.url} 은 잘못된 경로입니다.`;
            }
            (result)&& (textResult = await Prediction.Translate_ENtoKO(result))
        } catch (err) {
            console.log(err);
            textResult = `오류 ${err}}, 인공지능 서버에서 오류가 발생했습니다.`;
        }
    } else return textResult = "이미지 데이터가 없습니다.";

    try {
        const base64result = await googleTTS.getAudioBase64(textResult, {
            lang: 'ko',
            slow: false,
            host: 'https://translate.google.com',
            timeout: 10000,
        });
        res.send({result: base64result});
    } catch (err) {
        console.log(err);
        res.send({err: err});
    }
}

router.post('/caption', middleware.Parser, Predict);
router.post('/ocr', middleware.Parser, Predict);
router.post('/test', (req, res) => {res.send("Hello World")})

export default router;