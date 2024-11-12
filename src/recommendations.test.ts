import request from "supertest";
import app from "./server";
import mongoose from "mongoose";

describe("POST /recommendations", () => {
  // Clean up database and server connections after each test
  afterEach(async () => {
    await mongoose.connection.close();
    await new Promise((resolve) => app.listen().close(resolve));
  });

  // Test recommendation generation endpoint
  it("should generate and save recommendations", async () => {
    // Send POST request with test user data
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

    // Verify response structure and content
    expect(response.status).toBe(200);
    expect(response.body.userId).toBe("test_user");
    expect(Array.isArray(response.body.recommendations)).toBe(true);
  });
});
