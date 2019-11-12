import request from "supertest";
import app from "../src/app";
import { expect, assert } from "chai";
import emailsInMemory from "memory-cache";

describe("DELETE /v1/emails/7pgk3y4k2vwaqq2", () => {
    const testId = "7pgk3y4k2vwaqq2";
    // put a dummy email into database for testing
    emailsInMemory.put(testId, {id: testId, status: "QUEUED"});

    it("should return 200 OK and status TRUE when deleting an exisitng email in memory", (done) => {    
        const res = request(app).delete("/v1/emails/" + testId)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.error).to.be.false;
                expect(res.body.errors).to.be.undefined;
                
                expect(res.body.id).to.equal(testId);
                assert.match(res.body.deleted, /TRUE/);

                done();
            })
            .expect(200);
    });
});

describe("DELETE /v1/emails/", () => {
    it("should return 200 OK with status when invalid email id is missing in request", (done) => {
        const testId = "7pgk3y4k2vwaqq2";
        const res = request(app).delete("/v1/emails/" + testId)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.error).to.be.false;
                expect(res.body.errors).to.be.undefined;
                
                expect(res.body.id).to.equal(testId);
                assert.match(res.body.deleted, /FALSE/);

                done();
            })
            .expect(200);
    });
});
