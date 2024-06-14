import { JwtAdapter } from "../config/jwt.adapter";
import { UserModel } from "../data/mongodb/models/user.model";
import { LoginUserDto } from "../domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../domain/entities/user.entity";
import { ROLES } from "../domain/enums/role.emun";
import { CustomError } from "../domain/errors/custom.error";
import { UserMaper } from "../domain/mapers/userMapers";

export class AuthService {
  /**
   * The function `register` in TypeScript registers a new user by checking if the user already exists,
   * creating a new user with specified roles, and returning the user entity.
   * @param {RegisterUserDto} registerUserDto - The `registerUserDto` parameter is an object that
   * contains the data needed to register a new user. It typically includes properties such as `email`,
   * `password`, `name`, and any other required information for creating a new user account. In the
   * provided code snippet, the `email` property is
   * @returns The `register` function is returning a Promise that resolves to a `UserEntity` object.
   */
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { email } = registerUserDto;
    try {
      const exist = await UserModel.findOne({ email });
      if (exist) throw Error("invalid user");
      const user = await UserModel.create({
        ...registerUserDto,
        roles: ROLES.COMPRADOR,
      });
      if (!user) throw CustomError.badRequest("register user failed")
      await user.save();
      return UserMaper.fromEntity(user);
    } catch (error) {
      if( error instanceof CustomError ) throw error;
      throw CustomError.internalServer();
    }
  }

  /**
   * The login function in TypeScript takes a loginUserDto, validates the user's credentials, generates
   * a token, and returns the token along with the user entity.
   * @param {LoginUserDto} loginUserDto - The `loginUserDto` parameter is an object that contains the
   * user's email and password. It is used to authenticate a user during the login process.
   * @returns The `login` function returns a Promise that resolves to an object containing a `token`
   * (string) and a `user` (UserEntity) if the login process is successful. If there is an error during
   * the login process, it will throw an appropriate error message.
   */
  async login(
    loginUserDto: LoginUserDto
  ): Promise<{ token: string; user: UserEntity }> {
    const { email, password } = loginUserDto;

    try {
      const loginUser = await UserModel.findOne({ email });
      if (!loginUser) throw Error("no existe el usuario");
      if (loginUser.password !== password) throw Error("invalid password");
      const token = await JwtAdapter.generateToken({ id: loginUser.id });
      if (!token) throw CustomError.badRequest("token failed")

      return {
        token,
        user: UserMaper.fromEntity(loginUser),
      };
    } catch (error) {
      if( error instanceof CustomError ) throw error;
      throw CustomError.internalServer();
    }
  }
}
