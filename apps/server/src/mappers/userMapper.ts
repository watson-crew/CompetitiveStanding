// import { User as PrismaUser, Location } from 'database';
import { User as UserDto, UserInput as UserInputDto } from 'schema';

// TODO: Refactor mappers to be clearer and more uniform


// Without location
export function mapUser(prismaUser: any): UserDto {
  return {
    id: prismaUser.id.toString(),
    memorableId: prismaUser.memorableId,
    firstName: prismaUser.firstName,
    lastName: prismaUser.lastName,
    profilePicture: prismaUser.profilePicture,
  };
}

// Maps prisma User -> schema User
// With location
export function mapUserWithLocation(prismaUser: any): UserDto {
  console.log(prismaUser);

  return {
    id: prismaUser.id.toString(),
    memorableId: prismaUser.memorableId,
    firstName: prismaUser.firstName,
    lastName: prismaUser.lastName,
    location: prismaUser.location?.name ?? 'default', // Optional?
    profilePicture: prismaUser.profilePicture, // Optional?
  };
}

type PrismaUserInput = {}
// TODO: Add specific type from Prisma
// UserCreateManyInput or UserUncheckedCreateInput
// Can we alias this in database so it has a better name? Or don't bother, just do it here to be clear what we are making
export function mapUserInputToPrismaUserInput(userInput: UserInputDto): any {
  // Map from schema userInput (create user data) => prisma create user data
  // TODO: Handle optional fields (homeLocationId and profilePictureUrl)
  return {
    firstName: userInput.firstName,
    lastName: userInput.lastName,
    memorableId: userInput.memorableId,
    locationId: userInput.homeLocationId,
    profilePicture: userInput.profilePictureUrl
  }
  // If they had the same name
  // return userInput as PrismaUserInput; // Automatic mapping as the fields are the same...
}