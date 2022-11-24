import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: '../../packages/schema/schema.json',
  apiFile: './src/stores/emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './src/stores/competitiveStandingApi.ts',
  exportName: 'competitiveStandingApi',
  hooks: true,
}

export default config