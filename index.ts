import { DataSourceConfiguration, DataSourceContext, ExtensionRegistry } from '@frontastic/extension-types';
import DynamicYieldApi from './apis/DynamicYieldApi';
import { Product } from '@Types/product/Product';
import { getContext } from './utils/Request';

export default {
  'data-sources': {
    'dynamicyield/product-recommendations-campaign': async (
      config: DataSourceConfiguration,
      context: DataSourceContext,
    ) => {
      const userId: string = context.request?.clientIp;
      const dyApi: DynamicYieldApi = new DynamicYieldApi(context.frontasticContext, userId);
      const pageContextType: string = config?.configuration?.pageContextType;
      const dyContext = getContext(context.request, pageContextType);

      const campaignSelectorName: string = config?.configuration?.campaignSelectorName;

      const selector = [campaignSelectorName];

      let items: Product[];
      try {
        items = await dyApi.choose(dyContext, selector);
      } catch (err) {
        console.error(err);
      }
      return {
        dataSourcePayload: { items },
      };
    },
  },
} as ExtensionRegistry;
