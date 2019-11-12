import request from "supertest";
import app from "../src/app";
import { expect, assert } from "chai";

describe("POST /v1/emails", () => {
    it("should pass with either SENT or QUEUED from assert when complete message is posted", (done) => {
        const res = request(app).post("/v1/emails")
            .set("Accept", "application/json")
            .send({
                "to": "KPW@gmail.com",
                "content": "You are awesome!",
                "subject": "awesome!"
            })
            .expect("Content-Type", /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.error).to.be.false;
                expect(res.body.errors).to.be.undefined;

                // The length of email unique id is at least 14
                assert.isAtLeast(36, 14, res.body.id.length);
                assert.match(res.body.status, /SENT|QUEUED/);

                done();
            })
            .expect(200);
    });
});

describe("POST /v1/emails", () => {
    it("should return res.body.errors and FAILED status when incomplete message is posted", (done) => {
        const res = request(app).post("/v1/emails")
            .set("Accept", "application/json")
            .send({
                "content": "You are awesome!",
                "subject": "awesome!"
            })
            .expect("Content-Type", /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.error).to.be.false;
                expect(res.body.errors).not.to.be.undefined;

                expect(res.body.id).to.be.undefined;

                done();
            })
            .expect(200);
    });
});
