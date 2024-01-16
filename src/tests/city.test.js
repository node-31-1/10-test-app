const request = require('supertest');
const app = require('../app');

let id;

test("GET /cities debe traer todas las ciudades", async () => {
    const res = await request(app).get('/cities');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /cities debe crear una ciudad", async () => {
    const newCity = {
        name: "Ciudad de Mexico",
        country: "Mexico",
        isCapital: true,
    }
    const res = await request(app).post('/cities').send(newCity);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newCity.name);
});

test("DELETE /cities/:id debe eliminar una ciudad", async () => {
    const res = await request(app).delete(`/cities/${id}`);
    expect(res.status).toBe(204);
});
