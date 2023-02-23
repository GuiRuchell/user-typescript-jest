import { User } from "../../entities/User";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepositories";
import { CreateUserService } from "./CreateUserService";

//Executa uma função antes de qualquer um dos testes neste arquivo ser executado. 
//Se a função retornar uma promise ou for um generator, 
//o Jest vai esperar até que ela esteja resolvida para executar os testes.

describe("Create user", () => {
  let usersRepository: IUsersRepository;
  let createUserService: CreateUserService;

  beforeAll(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(usersRepository);
  });

  it("should be able to create a new user", async () => {
    const userData: User = {
      name: "Test Name",
      email: "test@test.com.br",
      username: "testusername",
    };

    const user = await createUserService.execute(userData);

    //toHaveProperty para verificar se a propriedade fornecida na referência keyPath existe para um objeto.
    expect(user).toHaveProperty("id");
    //toBe serve para validar um valor
    expect(user.username).toBe("testusername");
  });

  it("should not be able to create an existing user", async () => {
    const userData: User = {
      name: "Test Existing Name",
      email: "testexisting@test.com.br",
      username: "testexisting",
    };

    await createUserService.execute(userData);

    await expect(createUserService.execute(userData)).rejects.toEqual(
      new Error("User already exists!")
    );
  });
});
