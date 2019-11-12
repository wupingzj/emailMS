// import nodemailer from "nodemailer";
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";

// const transporter = nodemailer.createTransport({
//     service: "SendGrid",
//     auth: {
//         user: process.env.SENDGRID_USER,
//         pass: process.env.SENDGRID_PASSWORD
//     }
// });

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

    if (!errors.isEmpty()) {
        res.setHeader("Content-Type", "application/json");

        return res.end(JSON.stringify(errors));

        // flash requires session. We don't want over engineer just for now
        // req.flash("errors", errors.array());
        // return res.redirect("/error");
    }

    // sending email is slow, it should apply async/await

    const mailOptions = {
        to: `${req.body.to}`,
        subject: `${req.body.subject}`,
        text: `${req.body.content}`
    };

    // transporter.sendMail(mailOptions, (err) => {
    //     if (err) {
    //         // req.flash("errors", { msg: err.message });
    //         return res.redirect("/contact");
    //     }
    //     // req.flash("success", { msg: "Email has been sent successfully!" });
    //     res.redirect("/contact");
    // });

    return res.json("It is done");
};


/**
 * POST
 * Delete a currently queued email
 */
export const deleteEmail = (req: Request, res: Response) => {
    res.send("TO DO: delete email ");
};
