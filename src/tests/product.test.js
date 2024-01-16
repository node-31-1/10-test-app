const request = require('supertest');
const app = require('../app');

let id;

test("GET /products debe traer todos los productos", async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});


test("POST /products debe crear un producto", async () => {
    const newProduct = {
        name: "Samsung smart TV",
        price: 500,
        category: "Smart TV",
    }
    const res = await request(app).post('/products').send(newProduct);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newProduct.name);
});


test("DELETE /products/:id debe eliminar un producto", async () => {
    const res = await request(app).delete(`/products/${id}`);
    expect(res.status).toBe(204);
});
