import { DataSourceConfiguration, DataSourceContext, ExtensionRegistry } from '@frontastic/extension-types';
import DynamicYieldApi from './apis/DynamicYieldApi';
import { Product } from '@Types/product/Product';
import { getContext } from './utils/Request';
import { Request } from '@frontastic/extension-types';
import { CartFetcher } from '@Commerce-commercetools/utils/CartFetcher';
import { ActionContext } from '@frontastic/extension-types';
import { CartApi } from '@Commerce-commercetools/apis/CartApi';
import { getLocale } from '@Commerce-commercetools/utils/Request';

function getCartApi(request: Request, actionContext: ActionContext) {
  return new CartApi(actionContext.frontasticContext, getLocale(request));
}

async function createCartId(context: DataSourceContext) {
  const request = context.request;
  const cartApi = getCartApi(request, context);
  const cart = await CartFetcher.fetchCart(cartApi, request, context);
  const cartId = cart.cartId;
  return cartId;
}

export default {
  'data-sources': {
    'dynamicyield/product-recommendations-campaign': async (
      config: DataSourceConfiguration,
      context: DataSourceContext,
    ) => {
      const dyApi: DynamicYieldApi = new DynamicYieldApi(context.frontasticContext);
      const pageContextType: string = config?.configuration?.pageContextType;
      const dyContext = getContext(context.request, pageContextType);
      let cartId: string = context.request?.sessionData?.cartId;
      if (!cartId) {
        cartId = await createCartId(context);
      }

      const userId: string = context.request?.clientIp;
      const campaignSelectorName: string = config?.configuration?.campaignSelectorName;

      const selector = [campaignSelectorName];

      let items: Product[];
      try {
        items = await dyApi.choose(userId, cartId, dyContext, selector);
      } catch (err) {
        console.error(err);
      }
      return {
        dataSourcePayload: { items },
      };
    },
  },
} as ExtensionRegistry;
