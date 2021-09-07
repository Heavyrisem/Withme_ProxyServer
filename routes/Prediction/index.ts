import { Request, Response, Router } from "express";
import middleware from "../../middleware";
import Prediction from "../../model/Prediction";
import * as googleTTS from 'google-tts-api';


const router = Router();

const Predict = async (req: Request<any,any,{imageData: string}>, res: Response) => {
    let textResult = "";
    let timer = Date.now();
    if (req.body.imageData) {
        console.log("base64 length", req.body.imageData.length);

        try {
            let imageBuffer = Buffer.from(req.body.imageData, "base64");
            console.log("ImageBuffer", imageBuffer.byteLength / 1000, 'KB');
            switch (req.url) {
                case "/caption": 
                    textResult = await Prediction.Caption(imageBuffer);
                    textResult = await Prediction.Translate_ENtoKO(textResult); break;
                case "/ocr": textResult = await Prediction.OCR(imageBuffer); break;
                default: textResult = `${req.url} 은 잘못된 경로입니다.`;
            }
            
        } catch (err) {
            console.log(err);
            textResult = `오류 ${err}}, 인공지능 서버에서 오류가 발생했습니다.`;
        }
    } else textResult = "이미지 데이터가 없습니다.";
    console.log(textResult);
    try {
        let TTStimer = Date.now();
        const audioUrl = googleTTS.getAllAudioUrls(textResult, {
            lang: 'ko',
            slow: false,
            host: 'https://translate.google.com',
        });
        console.log("TTS gen time", Date.now() - timer, 'ms');
        console.log("Request time", Date.now() - timer, 'ms');
        res.send({result: audioUrl});
    } catch (err) {
        console.log(err);
        res.send({err: err});
    }
}

router.post('/caption', middleware.Parser, Predict);
router.post('/ocr', middleware.Parser, Predict);
router.post('/test', (req, res) => {res.send("Hello World")})

export default router;