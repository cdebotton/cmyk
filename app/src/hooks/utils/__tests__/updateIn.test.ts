import { updateIn } from '../updateIn';

type Video = {
  title: string;
  meta: {
    likes: number;
  };
};

type User = {
  email: string;
};

type Album = {
  title: string;
  user: User;
  videos: Video[];
};

describe('updateIn', () => {
  let album: Album;

  beforeEach(() => {
    album = {
      title: 'My album',
      user: { email: 'christian@vimeo.com' },
      videos: [{ title: 'Foo', meta: { likes: 0 } }, { title: 'Bar', meta: { likes: 0 } }],
    };
  });

  it('should update a nested value', () => {
    expect(updateIn(album, ['videos', 0, 'meta', 'likes'], value => value + 1)).toEqual({
      ...album,
      videos: [
        {
          ...album.videos[0],
          meta: {
            ...album.videos[0].meta,
            likes: 1,
          },
        },
        album.videos[1],
      ],
    });
  });

  it('should make updates immutably', () => {
    const newAlbum = updateIn(album, ['videos', 0, 'meta', 'likes'], value => value + 1);
    expect(newAlbum).not.toBe(album);
    expect(newAlbum.user).toBe(album.user);
    expect(newAlbum.videos).not.toBe(album.videos);
    expect(newAlbum.videos[0]).not.toBe(album.videos[0]);
    expect(newAlbum.videos[0].meta).not.toBe(album.videos[0].meta);
    expect(newAlbum.videos[1]).toBe(album.videos[1]);
  });
});
