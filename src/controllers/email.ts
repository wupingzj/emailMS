// import nodemailer from "nodemailer";
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import nodemailer from "nodemailer";
import logger from "../util/logger";
import uniqid = require("uniqid");

const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
    }
});

/**
 * GET
 * Get email status
 */
export const getEmailStatus = (req: Request, res: Response) => {
    res.send("TO DO: get email status");
};

/**
 * POST
 * Send an email via Nodemailer.
 */
export const sendEmail = async (req: Request, res: Response) => {
    await check("subject", "Name cannot be blank").not().isEmpty().run(req);
    await check("to", "Email is not valid").isEmail().run(req);
    await check("content", "Message cannot be blank").not().isEmpty().run(req);

    const errors = validationResult(req);

    const emailId: string = uniqid();
    if (!errors.isEmpty()) {
        logger.debug("Email is not sent and put into queue with email id: " + emailId);

        // put into queue - TODO
        const result = { id: emailId, status: "FAILED" };

        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(errors));
    }

    // sending email is slow, it should apply async/await

    const mailOptions = {
        to: `${req.body.to}`,
        from: "KevinPingWuTest@gmail.com",
        subject: `${req.body.subject}`,
        text: `${req.body.content}`
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            logger.debug("Email is not sent and put into queue with email id: " + emailId);

            // put into queue - TODO
            const result = { id: emailId, status: "QUEUED" };
            return res.json(result);
        }

        // put into queue - TODO
        logger.debug("Email is successfully sent and put into queue with email id: " + emailId);
        const result = { id: emailId, status: "SENT" };
        return res.json(result);
    });
};

/**
 * POST
 * Delete a currently queued email
 */
export const deleteEmail = (req: Request, res: Response) => {
    res.send("TO DO: delete email ");
};
