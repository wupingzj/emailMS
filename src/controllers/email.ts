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
    await check("name", "Name cannot be blank").not().isEmpty().run(req);
    await check("email", "Email is not valid").isEmail().run(req);
    await check("message", "Message cannot be blank").not().isEmpty().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // req.flash("errors", errors.array());
        return res.redirect("/contact");
    }

    const mailOptions = {
        to: "KevinPingWu@gmail.com",
        from: `${req.body.name} <${req.body.email}>`,
        subject: "Email Form",
        text: req.body.message
    };

    // transporter.sendMail(mailOptions, (err) => {
    //     if (err) {
    //         // req.flash("errors", { msg: err.message });
    //         return res.redirect("/contact");
    //     }
    //     // req.flash("success", { msg: "Email has been sent successfully!" });
    //     res.redirect("/contact");
    // });
};


/**
 * POST
 * Delete a currently queued email
 */
export const deleteEmail = (req: Request, res: Response) => {
    res.send("TO DO: delete email ");
};
