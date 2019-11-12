// import nodemailer from "nodemailer";
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import nodemailer from "nodemailer";
import logger from "../util/logger";
import uniqid from "uniqid";

import emailsInMemory from "memory-cache";

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
export const getEmailStatus = async (req: Request, res: Response) => {
    const emailId = req.params.id;

    await check("id", "ID cannot be blank").not().isEmpty().run(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // email id is not valid
        logger.debug("Email ID is not provided: " + emailId);

        // Expected behaviour not defined in code challenge specification
        const result = { id: emailId, status: "invalid email ID" };
        return res.json(result);
    }

    const emailBody = emailsInMemory.get(emailId);
    if (!emailBody) {
        // email not found in database
        logger.debug("Email not found: " + emailId);

        const result = { id: emailId, status: "Email not found in database."};
        return res.json(result);
    } else {
        // email found, delete it
        const status = emailBody.status;
        console.log("The status of email " + emailId + " status=" + status);

        const result = { id: emailId, status: emailBody.status };
        return res.json(result);
    }
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
    // put into queue
    const mailInQueue = {
        id: emailId,
        status: "",
        to: `${req.body.to}`,
        subject: `${req.body.subject}`,
        text: `${req.body.content}`,
    };

    if (!errors.isEmpty()) {
        logger.debug("Email is not sent and put into queue with email id: " + emailId);

        // put into queue
        mailInQueue.status = "FAILED";
        emailsInMemory.put(emailId, mailInQueue);

        const result = { id: emailId, status: "FAILED" };
        return res.json(result);
    }

    const mailOptions = {
        to: `${req.body.to}`,
        from: "KevinPingWu@gmail.com",
        subject: `${req.body.subject}`,
        text: `${req.body.content}`
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            logger.debug("Email is not sent and put into queue with email id: " + emailId);

            // put into queue
            mailInQueue.status = "QUEUED";
            emailsInMemory.put(emailId, mailInQueue);

            const result = { id: emailId, status: "QUEUED" };
            return res.json(result);
        }

        // put into queue
        mailInQueue.status = "SENT";
        emailsInMemory.put(emailId, mailInQueue);

        logger.debug("Email is successfully sent and put into queue with email id: " + emailId);
        const result = { id: emailId, status: "SENT" };
        return res.json(result);
    });
};

/**
 * POST
 * Delete a currently queued email
 */
export const deleteEmail = async (req: Request, res: Response) => {
    const emailId = req.params.id;

    await check("id", "ID cannot be blank").not().isEmpty().run(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // email id is not valid
        logger.debug("Email ID is not provided: " + emailId);

        const result = { id: emailId, deleted: "FALSE" };
        return res.json(result);
    }

    const emailBody = emailsInMemory.get(emailId);
    if (!emailBody) {
        // email not found in database
        logger.debug("Email ID not found: " + emailId);

        const result = { id: emailId, deleted: "FALSE" };
        return res.json(result);
    } else {
        // email found, delete it
        emailsInMemory.del(emailId);
        logger.debug("Email deleted: " + emailId);

        const result = { id: emailId, deleted: "TRUE" };
        return res.json(result);
    }
};

