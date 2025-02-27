import "@testing-library/jest-dom";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onPost('/users').reply(200, { message: 'User created successfully' });
mock.onPost('/auth/login').reply(200, { token: 'mock-token' });

jest.mock('jwt-decode', () => jest.fn(() => ({
    sub: 'mock-sub',
    email: 'mock-email',
    first_name: 'mock-first-name',
    last_name: 'mock-last-name',
    isAdmin: true,
})));


