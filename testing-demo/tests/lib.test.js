const lib = require(`../lib`);

describe(`absolute`, () => {
    it(`should return a positive number is input is positive`, () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it(`should return a positive number is input is negative`, () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it(`should return 0 is input is 0`, () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe(`greet`, () => {
    it(`should return the greeting message`, () => {
        const result = lib.greet(`John Doe`);
        expect(result).toMatch(/Welcome John Doe/);
    });
});

describe(`getCurrencies`, () => {
    it(`should return supported currencies`, () => {
        const result = lib.getCurrencies();

        // Too general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // Too specific
        expect(result[0]).toBe(`USD`);
        expect(result[1]).toBe(`AUD`);
        expect(result[2]).toBe(`EUR`);
        expect(result.length).toBe(3);

        // Proper way
        expect(result[0]).toContain(`USD`);
        expect(result[1]).toContain(`AUD`);
        expect(result[2]).toContain(`EUR`);

        // Ideal way
        expect(result).toEqual(expect.arrayContaining([`EUR`, `USD`, `AUD`]));
    });
});

describe(`getProduct`, () => {
    it(`should return the product with the given id`, () => {
        const result = lib.getProduct(1);
        expect(result).toEqual({id: 1, price: 10});
        expect(result).toMatchObject({id: 1, price: 10});
        expect(result).toHaveProperty(`id`, 1);
    })
});

describe(`registerUser`, () => {
    it.each([null, undefined, ``, 0, false, NaN])(("should throw if username is '%s'"), (userName) => {
        expect(() => {
            lib.registerUser(userName)
        }).toThrow();
    });

    it(`should return a user object if valid username is passed`, () => {
        const result = lib.registerUser(`Doe`);
        expect(result).toMatchObject({username: `Doe`});
        expect(result.id).toBeGreaterThan(0);
    });
});