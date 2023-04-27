import { DataSourceConfiguration, DataSourceContext, ExtensionRegistry } from '@frontastic/extension-types';
import CampaignApi from './apis/CampaignApi';
import { Product } from '@Types/content/dynamicyield/Product';
import { DynamicYieldMapper } from './mappers/DynamicYieldMapper';
import { getContext } from './utils/Request';
import { Request } from '@frontastic/extension-types';
import {CartFetcher} from "@Commerce-commercetools/utils/CartFetcher";
import { ActionContext } from '@frontastic/extension-types';
import { CartApi } from '@Commerce-commercetools/apis/CartApi';
import {getLocale} from "@Commerce-commercetools/utils/Request";

function getCartApi(request: Request, actionContext: ActionContext) {
  return new CartApi(actionContext.frontasticContext, getLocale(request));
}

async function createCartId(context : DataSourceContext) {
  const request =  context.request
  const cartApi = getCartApi(request, context);
  let cart = await CartFetcher.fetchCart(cartApi, request, context);
  const cartId = cart.cartId;
  return cartId
}

export default {
  'data-sources': {
    'frontastic/dynamicyield/product-recommendations-campaign': async (config: DataSourceConfiguration, context: DataSourceContext) => {

      const campaignApi : CampaignApi = new CampaignApi(context.frontasticContext);
      const pageContextType : string = config?.configuration?.pageContextType
      const dyContext : any = getContext(context.request, pageContextType);
      let cartId : string = context.request?.sessionData?.cartId
      if (!cartId) {
        cartId = await createCartId(context)
      }

      const userId : string = context.request?.clientIp
      const campaignSelectorName : string = config?.configuration?.campaignSelectorName

      const selector = [
        campaignSelectorName
      ]

      let items : Product[]
      console.log("###########################")
      console.log(dyContext)
      try {
        const result = await campaignApi.choose(userId, cartId, dyContext, selector )

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
