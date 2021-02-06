/* global describe beforeEach it */

const { expect } = require("chai");
const request = require("supertest");
const {
	db,
	syncAndSeed,
	models: { User },
} = require("../db");
const app = require("../app");

describe("Plant routes", () => {
	beforeEach(async () => {
		await syncAndSeed();
	});

	describe("/api/plants/", () => {
		it("GET /api/plants", async () => {
			const res = await request(app).get("/api/plants").expect(200);

			expect(res.body).to.be.an("array");
			expect(res.body.length).to.equal(24);
		});

		it("Get /api/plants/1", async () => {
			const res = await request(app).get("/api/plants/1").expect(200);
			expect(res.body).to.be.an("object");
		});
	}); // end describe('/api/plants')
}); // end describe('Plant routes')
