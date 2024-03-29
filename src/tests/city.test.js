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

test("GET /cities/:id debe traer una ciudad por id", async () => {
    const res = await request(app).get(`/cities/${id}`);
    expect(res.status).toBe(200);
});

test("PUT /cities/:id debe actualizar una ciudad", async () => {
    const city = {
        name: "Ciudad de Mexico actualizada",
    }
    const res = await request(app).put(`/cities/${id}`).send(city);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(city.name);
})

test("DELETE /cities/:id debe eliminar una ciudad", async () => {
    const res = await request(app).delete(`/cities/${id}`);
    expect(res.status).toBe(204);
});
