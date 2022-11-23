// import { User as PrismaUser, Location } from 'database';
// import { User as UserDto, UserInput as UserInputDto } from 'schema';
import { PrismaTypes, User as PrismaUser } from '../../dist/node_modules/database'
import { Mapper } from './generics'

type UserInputDto = {
  memorableId: string;
  firstName: string;
  lastName: string;
  profilePictureUrl?: string;
  homeLocationId?: number;
};

type UserDto = {
  id: number;
  memorableId: string;
  firstName: string;
  lastName: string;
  location?: string;
  profilePicture?: string;
};

// Not PrismaUser, what model do we need>
export const UserGetMapper: Mapper<PrismaUser, UserDto> = {
  // toPrisma: (apiModel: UserDto) => {
  //   return apiModel as PrismaUser; // Do we even need this function? When would we map from Schema User to Prisma User?
  // },
  map: (prismaModel: PrismaUser) => {
    let user: UserDto = {
      id: prismaModel.id,
      memorableId: prismaModel.memorableId,
      firstName: prismaModel.firstName,
      lastName: prismaModel.lastName,
      profilePicture: prismaModel.profilePicture,
    };

    // TODO: This will need doing for other relationships on the user, i.e group and team
    // May be a nicer way to do this
    if (prismaModel.location)
    {
      user.location = prismaModel.location.name;
    }
    return user
    // Or "return prismaModel as UserDto" if fields map
  }
}

// Not sure why it's UserCreateManyInput and not UserCreateInput but it seems to fit better
export const UserCreateMapper: Mapper<UserInputDto, PrismaTypes.UserCreateManyInput> = {
  map: (apiModel: UserInputDto) => {
    return {
      firstName: apiModel.firstName,
      lastName: apiModel.lastName,
      memorableId: apiModel.memorableId,
      profilePicture: apiModel.profilePictureUrl,
      locationId: apiModel.homeLocationId
    }
  },
  // toSchema: (prismaModel: PrismaTypes.UserCreateManyInput) => {
  //   return {}
  // }
}

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