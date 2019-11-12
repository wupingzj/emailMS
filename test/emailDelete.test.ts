import request from "supertest";
import app from "../src/app";
import { expect, assert } from "chai";

describe("DELETE /v1/emails/1", () => {
    it("should return 200 OK", (done) => {
        const testId = "7pgk3y4k2vwaqq2";
        const res = request(app).delete("/v1/emails/" + testId)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.error).to.be.false;
                expect(res.body.errors).to.be.undefined;
                
                expect(res.body.id).to.equal(testId);
                assert.match(res.body.deleted, /true|false/);

                done();
            })
            .expect(200);
    });
});
