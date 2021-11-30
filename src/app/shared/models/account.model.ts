export class Account {
  id: number;

  name: string;

  email: string;

  password: string;

  constructor({ id, name, email, password }: Account) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
