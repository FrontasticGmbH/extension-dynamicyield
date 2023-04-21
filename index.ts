import { DataSourceConfiguration, DataSourceContext, ExtensionRegistry } from '@frontastic/extension-types';
import CampaignApi from './apis/CampaignApi';
import { Product } from '@Types/content/dynamicyield/Product';
import { DynamicYieldMapper } from './mappers/DynamicYieldMapper';
import { getContext } from './utils/Request';

export default {
  'data-sources': {
    'frontastic/dynamicyield/product-recommendations-campaign': async (config: DataSourceConfiguration, context: DataSourceContext) => {

      const campaignApi : CampaignApi = new CampaignApi(context.frontasticContext);
      const dyContext : any = getContext(context.request);
      const sessionId : string = context.request?.sessionData?.cartId
      const userId : string = context.request?.clientIp
      const campaignSelectorName : string = config?.configuration?.campaignSelectorName
      const selector = [
        campaignSelectorName
      ]

      let items : Product[]

      try {
        const result = await campaignApi.choose(userId, sessionId, dyContext,selector )
        items = DynamicYieldMapper.mapChooseResponseToProducts(result)
      } catch (err) {
        console.error(err)
      }
      return {
        dataSourcePayload: { items }
      }
    },
  },


} as ExtensionRegistry;
