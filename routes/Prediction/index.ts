import { Request, Router } from "express";
import global from "../../global";
import middleware from "../../middleware";
import DeviceDB from "../../model/DeviceDB";
import Prediction from "../../model/Prediction";
import { NUGU_Request, NUGU_Response, Socket_Data_T } from "../Types";


const router = Router();

router.post('/caption', middleware.Parser, async (req: Request<any,any,NUGU_Request>, res) => {
    let nuguResponse = new NUGU_Response<{result: string}>({result: "NUGU 캔들의 정보를 가져오기 못했습니다."});

    if (req.body.profile) {
        try {
            const mobileID = await DeviceDB.FindDevice(req.body.profile.privatePlay.deviceUniqueId);
        
            if (global.SOCKET_CLIENTS[mobileID]) {
                // Send event to mobile
                console.log("Emit event");
                global.SOCKET_CLIENTS[mobileID].once("ImageCapture", async (data: Socket_Data_T) => {
                    try {
                        const result = await Prediction.Caption(Buffer.from(data.imageBuffer, "base64"));
                        nuguResponse.output.result = result;
                    } catch (err) {
                        nuguResponse.output.result = `오류 ${err}}, 인공지능 서버에서 오류가 발생했습니다.`;
                    } finally {res.send(nuguResponse.output.result)}
                });
                global.SOCKET_CLIENTS[mobileID].emit("ImageCapture", true);
            } else {
                // mobile device is offline
                console.log("Target Device is offline");
                nuguResponse.output.result = "모바일 디바이스가 오프라인입니다.";
            }
        } catch (err) {
            nuguResponse.output.result = "위드미 서버에서 요청을 처리하지 못했습니다.";
        } finally { return res.send(nuguResponse.toString()); }
    } else return res.send(nuguResponse.toString());

})

export default router;