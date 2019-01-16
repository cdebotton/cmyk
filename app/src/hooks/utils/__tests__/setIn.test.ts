import { setIn } from '../setIn';

type User = {
  email: string;
  name: {
    first: string;
    last: string;
  };
};

type Video = {
  title: string;
  user: User;
  createdAt: number;
};

type Album = {
  title: string;
  user: User;
  videos: Video[];
  createdAt: number;
};

describe('setIn', () => {
  let user: User;
  let video1: Video;
  let video2: Video;
  let album: Album;

  beforeEach(() => {
    user = {
      email: 'christian@vimeo.com',
      name: {
        first: 'Christian',
        last: 'de Botton',
      },
    };

    video1 = {
      user,
      title: 'My sweet video',
      createdAt: Date.now(),
    };

    video2 = {
      user,
      title: 'dogs r gr8',
      createdAt: Date.now(),
    };

    album = {
      user,
      title: 'Sick vidz',
      videos: [video1, video2],
      createdAt: Date.now(),
    };
  });

  test('it should set values in an object', () => {
    expect(setIn(album, ['title'], 'Test')).toEqual({ ...album, title: 'Test' });

    expect(setIn(album, ['user', 'name', 'first'], 'Christian!')).toEqual({
      ...album,
      user: {
        ...album.user,
        name: {
          ...album.user.name,
          first: 'Christian!',
        },
      },
    });
  });

  test('it should set values in arrays by number keys', () => {
    expect(setIn(album, ['videos', 0, 'title'], 'Foo')).toEqual({
      ...album,
      videos: [
        {
          ...album.videos[0],
          title: 'Foo',
        },
        album.videos[1],
      ],
    });
  });

  test('it should make changes immutably', () => {
    const newAlbum = setIn(album, ['user', 'name', 'first'], 'Foo');
    expect(newAlbum).not.toBe(album);
    expect(newAlbum.videos).toBe(album.videos);
    expect(newAlbum.user).not.toBe(album.user);
    expect(newAlbum.user.name).not.toBe(album.user.name);
    expect(newAlbum.user.email).toBe(album.user.email);

    const latestAlbum = setIn(newAlbum, ['videos', 0, 'title'], 'Bar');
    expect(latestAlbum.user).toBe(newAlbum.user);
    expect(latestAlbum.videos[0]).not.toBe(newAlbum.videos[0]);
    expect(latestAlbum.videos[1]).toBe(newAlbum.videos[1]);
  });
});
