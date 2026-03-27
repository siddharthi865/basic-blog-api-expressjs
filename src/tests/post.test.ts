import request from "supertest";
import app from "../src/app";

describe("Post API", () => {
  it("GET /api/posts should return 200", async () => {
    const res = await request(app).get("/api/posts");
    expect(res.statusCode).toBe(200);
  });
});