export interface Image {
  id: string;
  urls: {
    small: string;
    full: string;
    regular: string;
  };
  alt_description: string;
  user: User;
  likes: number;
}


export interface User {
  name: string;
  location: string | null;
}
