import request from "supertest"
import { app } from "../.."

describe("/caters", () => {

    beforeAll(async () => {
        await request(app).delete("/__test__/data")
    })


    it("should return 200 and empty array", async() => {
        await request(app)
            .get("./product-caters")
            .expect(200,[])
    })


    it("should return 200 and empty array", async() => {
        await request(app)
            .get("./product-caters")
            .expect(404)
    })

    it("should create course with correct input data", async() => {
        await request(app)
            .post("/courses")
            .send({title: 'new course'})
            .expect(400)
    })
})