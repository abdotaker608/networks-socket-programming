export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface ChatUser extends User {
  self?: boolean;
}
