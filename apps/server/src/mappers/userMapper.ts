// import { User as PrismaUser, Location } from 'database';
import { User as UserDto, CreateUserPayload as UserInputDto } from 'schema';
import { PrismaTypes, UserWithLocation as PrismaUserWithLocation } from 'database'
import { Mapper } from './generics'

// Not PrismaUser, what model do we need>
export const UserGetMapper: Mapper<PrismaUserWithLocation, UserDto> = {
  map: (prismaModel: PrismaUserWithLocation) => {
    const user: UserDto = {
      id: prismaModel.id,
      memorableId: prismaModel.memorableId,
      firstName: prismaModel.firstName,
      lastName: prismaModel.lastName,
      profilePicture: prismaModel.profilePicture, // Might be null
    };

    // TODO: This will need doing for other relationships on the user, i.e group and team
    // May be a nicer way to do this
    if (prismaModel.location)
    {
      user.location = prismaModel.location.name;
    }
    return user
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
  }
}