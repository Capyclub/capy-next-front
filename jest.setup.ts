import "@testing-library/jest-dom";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onPost('/users').reply(200, { message: 'User created successfully' });
mock.onPost('/auth/login').reply(200, { access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImZpcnN0X25hbWUiOiJUZXN0IiwibGFzdF9uYW1lIjoiVXNlciJ9.CjZcbNnKSLXnXNEPbsb6h_qeFlkI9FptDbYYNjTeL6o' });

jest.mock('jwt-decode', () => jest.fn(() => ({
    sub: 'mock-sub',
    email: 'mock-email',
    first_name: 'mock-first-name',
    last_name: 'mock-last-name',
    isAdmin: true,
})));


