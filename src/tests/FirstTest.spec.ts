import User from '@models/User';

test('it should be ok', () => {
  const user = new User();

  user.firstname = 'Diego';

  expect(user.firstname).toEqual('Diego');
});
