import { AppDataSource } from "~/config/app-data-source";
import { User } from "~/db/entities/user.entity";

export const UserRepository = AppDataSource.getRepository(User).extend({
  findByEmail(email: string) {
    return this.createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();
  },
  findByUsername(username: string) {
    return this.createQueryBuilder("user")
      .where("user.username = :username", { username })
      .getOne();
  },
  async checkEmailExists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);

    return user ? true : false;
  },
  async checkUsernameExists(username: string): Promise<boolean> {
    const user = await this.findByEmail(username);

    return user ? true : false;
  },
  createNewUser(username: string, email: string, password: string) {
    return this.createQueryBuilder("user")
      .insert()
      .into(User)
      .values({
        username,
        email,
        password,
      })
      .execute();
  },
});
