import { DataSourceConfiguration, DataSourceContext, ExtensionRegistry } from '@frontastic/extension-types';
import CampaignApi from './apis/CampaignApi';
import {getLocale} from "@Content-contentful/utils/Request";
import { Context, Request } from '@frontastic/extension-types';
export default {
  'data-sources': {
    'frontastic/dynamicyield/campaign': async (config: DataSourceConfiguration, context: DataSourceContext) => {
      const campaignApi = new CampaignApi();

      return {
        dataSourcePayload: campaignApi.getDyContext(context.request),
      }
    },
  },


} as ExtensionRegistry;
