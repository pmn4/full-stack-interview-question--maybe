import sayHello from './';

describe('sayHello', () => {
  it('greets a user', (): void => {
    const user = { name: 'TypeScript' };
    expect(sayHello(user)).toBe('Hello TypeScript!');
  });
});
