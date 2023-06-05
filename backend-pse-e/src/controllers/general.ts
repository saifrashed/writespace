import express from "express";
import {
    getHelloWorldService
} from "../services/general.service";

export async function getHelloWorldController(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const result = await getHelloWorldService();

    if (result.error) res.status(400).send(result.error);
    if (result.message) res.status(200).send(result.message);
}
