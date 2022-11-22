// import { Location as PrismaLocation } from 'database';
import { Location as LocationDto } from 'schema';

export type Mapper<ApiModel, PrismaModel> = {
  inputMapper: (apiModel: ApiModel) => PrismaModel
  outputMapper: (prismaModel: PrismaModel) => ApiModel
}

export function mapLocation(prismaLocation: any): LocationDto {
  return prismaLocation as LocationDto;
}
