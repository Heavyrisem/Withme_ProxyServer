import express, { Request, Response } from 'express';
import { IncomingMessage, ServerResponse } from 'http';

export default {
    Parser: (req: IncomingMessage, res: ServerResponse, next: (err?: any) => void) => {
        express.json()(req, res, (err) => {
            if (err) next(err);
            else express.urlencoded({extended: true})(req, res, next);
        });
    }
}