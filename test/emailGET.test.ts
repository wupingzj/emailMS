import request from "supertest";
import app from "../src/app";
import { expect, assert } from "chai";

describe("GET /v1/emails/1", () => {
    it("should return 200 OK", (done) => {
        request(app).get("/v1/emails/1")
            .expect(200, done);
    });
});
