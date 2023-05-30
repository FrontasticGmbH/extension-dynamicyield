// @ts-ignore
import fetch from 'node-fetch';
import BaseApi from './BaseApi';
import { DynamicYieldMapper } from '@Content-dynamicyield/mappers/DynamicYieldMapper';
import { Product } from '@Types/product/Product';
import { ExternalError } from '@Content-dynamicyield/utils/Errors';
import { ContextType } from '@Content-dynamicyield/utils/Request';

export default class DynamicYieldApi extends BaseApi {
  async choose(dyContext: ContextType, selectors: string[] = []): Promise<Product[]> {
    const userId = this.getUserId();
    const sessionId = this.getSessionId();
    const body = {
      selector: {
        names: selectors,
      },
      user: {
        id: userId,
      },
      session: {
        custom: sessionId,
      },
      context: dyContext,
    };
    const headers = {
      'dy-api-key': this.getDyClient().apiKey,
      'Content-Type': 'application/json',
    };

    let response: any = {};
    let resultBody: any = {};
    let items: Product[] = [];
    try {
      response = await fetch(this.getDyClient().url, {
        method: 'post',
        body: JSON.stringify(body),
        headers,
      });
      resultBody = JSON.stringify(await response.json());
    } catch (error: any) {
      throw new ExternalError({ status: error.code, message: error.message, body: error.body });
    }
    items = DynamicYieldMapper.mapChooseResponseToProducts(resultBody);
    return items;
  }
}
