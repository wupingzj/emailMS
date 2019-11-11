import { Request, Response } from "express";

/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response) => {
    const errors = req.flash("errors");
    res.send("Oops, something is not right:" + JSON.stringify(errors));
};

export const handleError = (req: Request, res: Response) => {
    const errors = req.flash("errors");
    res.send("Oops, something is not right:" + JSON.stringify(errors));
};