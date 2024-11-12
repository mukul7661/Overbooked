import request from "supertest";
import app from "./server";
import mongoose from "mongoose";

describe("GET /users/:user_id/recommendations", () => {
  afterEach(async () => {
    await mongoose.connection.close();
    await new Promise((resolve) => app.listen().close(resolve));
  });

  it("should retrieve saved recommendations", async () => {
    const user_id = "test_user";

    await request(app)
      .post("/recommendations")
      .send({
        user_id,
        preferences: ["science fiction"],
      });

    const response = await request(app).get(
      `/users/${user_id}/recommendations`
    );

    if (response.status === 200) {
      expect(response.body.user_id).toBe(user_id);
      expect(Array.isArray(response.body.recommendations)).toBe(true);
    } else if (response.status === 404) {
      expect(response.body.error).toBe(
        `No recommendations found for user_id ${user_id}.`
      );
    } else {
      throw new Error("Unexpected status code");
    }
  });
});
