import { DataSourceConfiguration, DataSourceContext, ExtensionRegistry } from '@frontastic/extension-types';
import CampaignApi from './apis/CampaignApi';

export default {
  'data-sources': {
    'frontastic/dynamicyield/product-recommendations-campaign': async (config: DataSourceConfiguration, context: DataSourceContext) => {
      const campaignApi = new CampaignApi();
      const dyContext = campaignApi.getDyContext(context.request);
      const sessionId = context.request?.sessionData?.cartId
      const userId = context.request?.clientIp
      const campaignSelectorName = config?.configuration?.campaignSelectorName
      const selector = [
        campaignSelectorName
      ]
      const result = await campaignApi.choose(userId, sessionId, dyContext,selector )
      console.log("DY result : #####################")
      console.log(result)
      return {
        dataSourcePayload: result
      }
    },
  },


} as ExtensionRegistry;
