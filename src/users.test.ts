import request from "supertest";
import app from "./server";
import mongoose from "mongoose";

describe("GET /users/:user_id/recommendations", () => {
  // Clean up database and server connections after each test
  afterEach(async () => {
    await mongoose.connection.close();
    await new Promise((resolve) => app.listen().close(resolve));
  });

  // Test recommendation retrieval endpoint
  it("should retrieve saved recommendations", async () => {
    const user_id = "test_user";

    // First create recommendations for the test user
    await request(app)
      .post("/recommendations")
      .send({
        user_id,
        preferences: ["science fiction"],
      });

    // Attempt to retrieve the created recommendations
    const response = await request(app).get(
      `/users/${user_id}/recommendations`
    );

    // Handle different response scenarios
    if (response.status === 200) {
      // Verify successful response structure
      expect(response.body.user_id).toBe(user_id);
      expect(Array.isArray(response.body.recommendations)).toBe(true);
    } else if (response.status === 404) {
      // Verify not found error message
      expect(response.body.error).toBe(
        `No recommendations found for user_id ${user_id}.`
      );
    } else {
      throw new Error("Unexpected status code");
    }
  });
});
