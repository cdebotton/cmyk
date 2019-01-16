import { getIn } from '../getIn';

type User = {
  name: {
    first: string;
    last: string;
  };
  birthYear: number;
  friends: User[];
};

describe('getIn', () => {
  let jeff: User;
  let me: User;

  beforeEach(() => {
    jeff = {
      name: {
        first: 'Jeff',
        last: 'Goldblum',
      },
      birthYear: 1952,
      friends: [],
    };

    me = {
      name: {
        first: 'Christian',
        last: 'de Botton',
      },
      birthYear: 1986,
      friends: [jeff],
    };
  });

  test('it should access deeply nested objects', () => {
    expect(getIn(me, ['name', 'first'])).toBe('Christian');
  });

  test('it should traverse arrays', () => {
    expect(getIn(me, ['friends', 0, 'name', 'first'])).toBe('Jeff');
  });
});