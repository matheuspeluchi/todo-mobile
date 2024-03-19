export type UserProps = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}
export type TaskProps = {
  id?: string;
  description: string;
  estimatedAt: Date;
  doneAt: Date | null;
};

export type AuthProps = {
  user: UserProps,
  token: string
}