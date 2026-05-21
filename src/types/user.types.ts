export const role = {
  maintainer: "maintainer",
  contributor: "contributor",
} as const;

export type Role = (typeof role)[keyof typeof role];

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: Role;
}
