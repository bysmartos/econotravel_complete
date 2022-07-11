import express from 'express';
import request,{Response} from 'supertest';
import { userRoute } from '../../src/route';


const app = express();

app.use(express.json())
app.use(userRoute);

describe('/user', ()=>
test('should return status 200 & content-type "application/json"',async ()=>{
    const response = await request(app)
    .get('/user')
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/json')
}))


describe("POST /user", () => {
    describe("when passed a email,password, name, last_name, role", () => {

        test('should respond with a 200 & content-type "application/json', async () => {
            const response = await request(app)
                .post('/user')
                .send({
                    email: "mi@mail.com",
                    password: "1234",
                    name: "sandra",
                   last_name:  "martos",
                    role: "client"
                });

            expect(response.status).toEqual(201);
            expect(response.headers['content-type']).toContain('application/json');
        })


        // should save the username and password in the database
        // should respond with a json object that contains the id from the database. (probably jwt in the real world)
    })

    describe("when some info is missing", () => {

        test("should return a 400 status code to show there was a user error.", async () => {
            const response = await request(app)
                .post('/user')
                .send({ password: "1234" });

            expect(response.status).toEqual(400);
        })
        // should return a json object that contains an error message.
        // should specify json as the content type in the http header.
    })

})