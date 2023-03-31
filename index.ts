import { DataSourceConfiguration, DataSourceContext, ExtensionRegistry } from '@frontastic/extension-types';
import CampaignApi from './apis/CampaignApi';
import { v4 as uuidv4 } from 'uuid';

import {getLocale} from "@Content-contentful/utils/Request";
import { Context, Request } from '@frontastic/extension-types';
export default {
  'data-sources': {
    'frontastic/dynamicyield/campaign': async (config: DataSourceConfiguration, context: DataSourceContext) => {
      console.log('campaign datasource test')
      const campaignApi = new CampaignApi();
      const dyContext = campaignApi.getDyContext(context.request);
      const sessionId = uuidv4();
      const userId = uuidv4()
      const selector = [
          'HP Hero Banner'
        ]
      const result = await campaignApi.choose(userId, sessionId, dyContext,selector )
      return {

        dataSourcePayload: 'test4'
      }
    },
  },


} as ExtensionRegistry;
