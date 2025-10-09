export interface User {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}

export interface Post {
  id: number;
  title: string;
  body: string;
}