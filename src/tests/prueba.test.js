const multiply = (a, b) => a * b;

const average = (a, b, c) => {
    return (a + b + c) / 3;
}

const convert = (celsius) => {
    return (celsius * (9/5)) + 32;
}

test("multiply(2, 2) debe retornar 4", () => {
    const result = multiply(2, 2);
    expect(result).toBe(4);
});

test("average(5, 10, 15) debe retornar 10", () => {
    const result = average(5, 10, 15);
    expect(result).toBe(10);
});

test("convert(20) debe retornar 68", () => {
    const result = convert(20);
    expect(result).toBe(68)
});
