const request = require('supertest');
const app = require('../app');
const City = require('../models/City');
require('../models');

let id;
let token;

test("POST /users debe crear un usuario", async () => {
    const city = await City.create({
        name: "city test",
        country: "country test",
        isCapital: false,
    })
    const newUser = {
        name: "cristian",
        email: "cristian@gmail.com",
        password: "cristian1234",
        cityId: city.id,
    }
    const res = await request(app).post('/users').send(newUser);
    id = res.body.id;
    await city.destroy();
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newUser.name);
});

test("POST /users/login debe hacer login", async () => {
    const credentials = {
        email: "cristian@gmail.com",
        password: "cristian1234",
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(credentials.email);
    expect(res.body.token).toBeDefined();
});

test("GET /users debe traer todos los usuarios", async() => {
    const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("PUT /users/:id debe actualizar un usuario", async () => {
    const user = {
        name: "cristian actualizado",
    }
    const res = await request(app)
        .put(`/users/${id}`)
        .send(user)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(user.name);
});

test("POST /users/login con credenciales incorrectas", async () => {
    const credentials = {
        email: "incorrecto@gmail.com",
        password: "incorrecto1234",
    }
    const res = await request(app).post('/users/login').send(credentials);
    expect(res.status).toBe(401);
});

test("DELETE /users/:id debe eliminar un usuario", async () => {
    const res = await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
