export type QuerySource = {};
export type MutationSource = {};

export enum Role {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  USER = 'USER',
  VIEWER = 'VIEWER',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export interface UserSource {
  id: string;
  email: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
}

export interface ProfileSource {
  avatar_id: string | null;
  created_at: Date;
  date_of_birth: Date | null;
  first_name: string;
  last_name: string;
  id: string;
  last_login: Date | null;
  updated_at: Date;
}

export interface FileSource {
  bucket: string;
  created_at: Date;
  encoding: string;
  etag: string;
  id: string;
  key: string;
  mimetype: string;
  size: number;
  updated_at: Date;
}
