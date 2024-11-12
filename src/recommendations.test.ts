import request from "supertest";
import app from "./server";
import mongoose from "mongoose";

describe("POST /recommendations", () => {
  afterEach(async () => {
    await mongoose.connection.close();
    await new Promise((resolve) => app.listen().close(resolve));
  });
  it("should generate and save recommendations", async () => {
    const response = await request(app)
      .post("/recommendations")
      .send({
        userId: "test_user",
        preferences: [
          "science fiction",
          "artificial intelligence",
          "space exploration",
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body.userId).toBe("test_user");
    expect(Array.isArray(response.body.recommendations)).toBe(true);
  });
});
