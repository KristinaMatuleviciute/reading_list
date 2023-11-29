const request = require("supertest");
const { app, server } = require("../index");

afterAll(async () => {
  if (server) {
    await server.close();
  }
});

describe("Server Integration Tests", () => {
  it("should return a 200 status for /api/books endpoint", async () => {
    const response = await request(app).get("/api/books");
    expect(response.status).toBe(200);
  });

  it("should handle CORS headers correctly", async () => {
    const response = await request(app).options("/api/books");
    expect(response.status).toBe(204);
    expect(response.headers["access-control-allow-origin"]).toBe("*");
    expect(response.headers["access-control-allow-headers"]).toBe(
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  });

  it("should return a 404 status for an unknown endpoint", async () => {
    const response = await request(app).get("/nonexistent");
    expect(response.status).toBe(404);
  });
});
