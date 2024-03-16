export type UserProps = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export type AuthProps = {
  user: UserProps,
  token: string
}