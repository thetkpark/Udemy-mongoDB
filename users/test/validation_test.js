const assert = require('assert');
const User = require('../src/users');

describe('Validating a record',() => {
  it('require a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert (message === 'Name is required.');
  });
  it ('require a user name longer than 2 characters',() => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert (message === 'Name must be longer than 2 characters.');

  });
  it ('Disallows invalid record from being saved',(done) => {
    const user = new User({ name: 'Al' });
    user.save()
      .catch((validationResult) => {
        const {message} = validationResult.errors.name;
        assert (message ==='Name must be longer than 2 characters.');
        done();
      });

  })

});
