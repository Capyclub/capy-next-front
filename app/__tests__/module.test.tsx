import { calculateAge, isValidAge, isValidPostalCode, isValidName, isValidEmail } from '../utils/module';

//FIXME : Test non fonctionnels
describe('CalculateAge', () => {

    it('should throw an error if no argument is provided', () => {
        expect(() => calculateAge()).toThrow("No argument was provided.");
    });

    // it('should return the correct age', () => {
    //     const p = {
    //         birth: new Date('2002-05-22')
    //     };

    //     const currentYear = new Date().getFullYear();
    //     const expectedAge = currentYear - 2002;

    //     expect(calculateAge(p)).toEqual(expectedAge);
    // });

    // it('should convert a valid string birth date (yyyy-mm-dd) to a Date object and calculate the age', () => {
    //     const p = { birth: '2002-05-22' };
    //     const currentYear = new Date().getFullYear();
    //     const expectedAge = currentYear - 2002;
    //     expect(calculateAge(p)).toEqual(expectedAge);
    // });

    it('should throw an error if the object does not contain a birth field', () => {
        const p = {};
        expect(() => calculateAge(p)).toThrow("The object does not contain a 'birth' field.");
    });

    it('should throw an error if the provided date is invalid', () => {
        const p = { birth: new Date('invalid-date') };
        expect(() => calculateAge(p)).toThrow("The provided date is not valid.");
    });

    it('should throw an error if the date format is invalid (dd-mm-yy instead of yyyy-mm-dd)', () => {
        const p = { birth: '22-05-2002' };
        expect(() => calculateAge(p)).toThrow("The date format is invalid. It should be yyyy-mm-dd.");
    });

});

describe('isValidAge', () => {
    it('should return true if the user is 18 or older', () => {
        const validDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
        expect(isValidAge(validDate)).toBe(true);
    });

    it('should return false if the user is under 18', () => {
        const under18Date = new Date(new Date().setFullYear(new Date().getFullYear() - 17));
        expect(isValidAge(under18Date)).toBe(false);
    });
});

describe('isValidPostalCode', () => {
    it('should return true for a valid postal code', () => {
        expect(isValidPostalCode('75001')).toBe(true);
    });

    it('should return false for an invalid postal code', () => {
        expect(isValidPostalCode('ABCDE')).toBe(false);
        expect(isValidPostalCode('123')).toBe(false);
        expect(isValidPostalCode('123456')).toBe(false);
    });
});

describe('isValidName', () => {
    it('should return true for a valid name', () => {
        expect(isValidName('Pierre-Alexis')).toBe(true);
        expect(isValidName('María')).toBe(true);
        expect(isValidName('Loïs')).toBe(true);
        expect(isValidName("O'Connor")).toBe(true);
    });

    it('should return false for an invalid name', () => {
        expect(isValidName('JAlex123')).toBe(false);
        expect(isValidName('JAlex@Doe')).toBe(false);
        // Dsl Elon Ton fils peut pas être inscrit au capyclub
        expect(isValidName('X Æ A-12')).toBe(false);
    });
});

describe('isValidEmail', () => {
    it('should return true for a valid email', () => {
        expect(isValidEmail('test@example.com')).toBe(true);
        expect(isValidEmail('user.name+tag+sorting@example.com')).toBe(true);
    });

    it('should return false for an invalid email', () => {
        expect(isValidEmail('plainaddress')).toBe(false);
        expect(isValidEmail('@@example.com')).toBe(false);
        expect(isValidEmail('email.example.com')).toBe(false);
        expect(isValidEmail('email@example@example.com')).toBe(false);
    });

});