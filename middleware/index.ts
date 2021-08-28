import express, { Request, Response } from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import { NUGU_Request } from '../routes/Types';

export default {
    Parser: (req: IncomingMessage, res: ServerResponse, next: (err?: any) => void) => {
        express.json()(req, res, (err) => {
            if (err) next(err);
            else express.urlencoded({extended: true})(req, res, next);
        });
    },
    NUGU_Dev: (req: Request, res: Response, next: any) => {
        console.log("DeV");
        if (req.body.version) {
            const nuguRequest = req.body as NUGU_Request;
            if (!nuguRequest.profile) req.body.profile = {
                privatePlay: {
                    deviceUniqueId: "TestID"
                }
            }
        }
        next();
    }
}