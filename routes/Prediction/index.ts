import { Request, Response, Router } from "express";
import global from "../../global";
import middleware from "../../middleware";
import DeviceDB from "../../model/DeviceDB";
import Prediction from "../../model/Prediction";
import { NUGU_Request, NUGU_Response, Socket_Data_T } from "../Types";


const router = Router();

const Predict = async (req: Request<any,any,NUGU_Request>, res: Response) => {
    let nuguResponse = new NUGU_Response<{result: string}>({result: "미인증된 캔들입니다. 인증을 먼저 진행해 주세요"});

    if (req.body.profile) {
        try {
            const mobileIDlist = await DeviceDB.FindDevice(req.body.profile.privatePlay.deviceUniqueId);
            let onlineDeviceID: string = "";
            let onlineDeviceNum = 0;
            console.log(Object.keys(global.SOCKET_CLIENTS));
            
            for (const ID of mobileIDlist)
                if (global.SOCKET_CLIENTS[ID]) {onlineDeviceNum++;onlineDeviceID=ID}

            if (onlineDeviceID && onlineDeviceNum == 1) {
                // Send event to mobile
                // console.log("Emit event");
                global.SOCKET_CLIENTS[onlineDeviceID].once("ImageCapture", async (data: Socket_Data_T) => {
                    console.log("base64 length", data.imageData.length);

                    try {
                        let result;
                        switch (req.url) {
                            case "/caption": 
                                result = await Prediction.Caption(Buffer.from(data.imageData, "base64"));
                                result = await Prediction.Translate_ENtoKO(result);
                                break;
                            case "/ocr": result = await Prediction.OCR(Buffer.from(data.imageData, "base64")); break;
                            default: result = `${req.url} 은 잘못된 경로입니다.`;
                        }
                        nuguResponse.output.result = result;
                    } catch (err) {
                        console.log(err);
                        nuguResponse.output.result = `오류 ${err}}, 인공지능 서버에서 오류가 발생했습니다.`;
                    } finally {return res.send(nuguResponse.toString())}
                });

                global.SOCKET_CLIENTS[onlineDeviceID].emit("ImageCapture", true);
            } else if (onlineDeviceNum > 1) {
                nuguResponse.output.result = "연결된 모바일 디바이스가 너무 많습니다. 한 개만 연결해 주세요.";
                return res.send(nuguResponse.toString());
            } else {
                // mobile device is offline
                // console.log("Target Device is offline");
                nuguResponse.output.result = "모바일 디바이스가 오프라인입니다.";
                return res.send(nuguResponse.toString());
            }
        } catch (err) {
            nuguResponse.output.result = "미인증된 캔들입니다. 인증을 먼저 진행해 주세요";
            return res.send(nuguResponse.toString());
        }
    } else return res.send(nuguResponse.toString());
}

router.post('/caption', middleware.Parser, Predict);
router.post('/ocr', middleware.Parser, Predict);
router.post('/test', (req, res) => {res.send("Hello World")})

export default router;