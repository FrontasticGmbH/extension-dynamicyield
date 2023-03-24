import { DataSourceConfiguration, DataSourceContext, ExtensionRegistry } from '@frontastic/extension-types';

export default {
  'data-sources': {
    'frontastic/dynamicyield/campaign': async (config: DataSourceConfiguration, context: DataSourceContext) => {
      return {
        dataSourcePayload: config.configuration.campaignId
      }
    },
  },

} as ExtensionRegistry;
