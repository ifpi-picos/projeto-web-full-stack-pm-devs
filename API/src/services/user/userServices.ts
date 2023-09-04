import { IUserRepository, IUserService } from "../../controllers/user/interfaces";
import { User } from "../../models/User";


export class userService implements IUserService{
  constructor(private readonly userRepository: IUserRepository) {}

  async getAllUsers(): Promise<User[]> {
      return this.userRepository.getAllUsers();
  }

  async getUserById(id: string): Promise<User | null> {
      return await this.userRepository.getUserById(id);
  }

  async addUser(user: User): Promise<Omit<User, "password"> | null> {
      return await this.userRepository.addUser(user);
  }
}