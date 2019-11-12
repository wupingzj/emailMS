import request from "supertest";
import app from "../src/app";
import { expect, assert } from "chai";
import emailsInMemory from "memory-cache";

describe("GET /v1/emails/1", () => {
    const testId = "7pgk3y4k2vwaqq2";
    // put a dummy email into database for testing
    emailsInMemory.put(testId, {id: testId, status: "QUEUED"});

    it("should return 200 OK and status when getting an exisitng email in memory", (done) => {    
        const res = request(app).get("/v1/emails/" + testId)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.error).to.be.false;
                expect(res.body.errors).to.be.undefined;
                
                expect(res.body.id).to.equal(testId);
                assert.match(res.body.status, /QUEUED/);

                done();
            })
            .expect(200);
    });
});
