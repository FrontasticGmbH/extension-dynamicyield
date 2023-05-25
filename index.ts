import { DataSourceConfiguration, DataSourceContext, ExtensionRegistry } from '@frontastic/extension-types';
import DynamicYieldApi from './apis/DynamicYieldApi';
import { Product } from '@Types/product/Product';
import { getContext } from './utils/Request';
import { ValidationError } from './utils/Errors';
export default {
  'data-sources': {
    'dynamicyield/product-recommendations-campaign': async (
      config: DataSourceConfiguration,
      context: DataSourceContext,
    ) => {
      if (!context.hasOwnProperty('request')) {
        throw new ValidationError({
          message: `Request is not defined in context ${context}`,
        });
      }
      const userId: string = context.request?.clientIp;
      if (!userId) {
        throw new ValidationError({
          message: `Client IP is not defined in context request ${context.request}`,
        });
      }
      const dyApi: DynamicYieldApi = new DynamicYieldApi(context.frontasticContext, userId);
      const pageContextType: string = config?.configuration?.pageContextType;
      if (!pageContextType) {
        throw new ValidationError({
          message: `Page context type is not defined in configuration ${config}`,
        });
      }

      const dyContext = getContext(context.request, pageContextType);

      const campaignSelectorName: string = config?.configuration?.campaignSelectorName;
      if (!campaignSelectorName) {
        throw new ValidationError({
          message: `Dynamicyield campaign selector name is not defined in configuration ${config}`,
        });
      }
      const selector = [campaignSelectorName];
      const items: Product[] = await dyApi.choose(dyContext, selector);
      return {
        dataSourcePayload: { items },
      };
    },
  },
} as ExtensionRegistry;
