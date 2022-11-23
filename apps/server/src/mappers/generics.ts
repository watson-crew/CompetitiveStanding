export type Mapper<InputModel, MappedModel> = {
  map: (model: InputModel) => MappedModel
}