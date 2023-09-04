import { IUserRepository, IUserService } from "../../controllers/user/interfaces";
import { User } from "../../models/User";


export class userService implements IUserService{
  constructor(private readonly userRepository: IUserRepository) {}

  async getAllUsers(): Promise<User[]> {
      return this.userRepository.getAllUsers();
  }
}