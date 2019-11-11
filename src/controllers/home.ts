import { Request, Response } from "express";

/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response) => {
    res.end("<h1><p><center>Welcome to the Email Management System</center></p></h1>");
};
