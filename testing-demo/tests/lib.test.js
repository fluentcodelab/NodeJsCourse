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