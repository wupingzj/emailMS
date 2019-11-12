import request from "supertest";
import app from "../src/app";
import { expect, assert } from "chai";

describe("GET /v1/emails/1", () => {
    it("should return 200 OK", (done) => {
        request(app).get("/v1/emails/1")
            .expect(200, done);
    });
});

describe("POST /v1/emails", () => {
    it("should pass from assert when complete message is posted", (done) => {
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

                expect(res.body.id).to.have.length(24);
                assert.match(res.body.status, /SENT | QUEUED | FAILED/, "email status must be either SENT or QUEUED or FAILED");

                done();
            })
            .expect(200);
    });
});

describe("POST /v1/emails", () => {
    it("should return res.body.errors when incomplete message is posted", (done) => {
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
                done();
            })
            .expect(200);
    });
});

describe("DELETE /v1/emails/1", () => {
    it("should return 200 OK", (done) => {
        request(app).delete("/v1/emails/1")
            .expect(200, done);
    });
});
