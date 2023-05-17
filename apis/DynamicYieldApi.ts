// @ts-ignore
import fetch from 'node-fetch';
import BaseApi from './BaseApi';
import { DynamicYieldMapper } from '@Content-dynamicyield/mappers/DynamicYieldMapper';
import { Product } from '../../../types/content/dynamicyield/Product';

export default class DynamicYieldApi extends BaseApi {
  async choose(userId: any, sessionId: any, dyContext: any, selectors: any[] = []): Promise<Product[]> {
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
      items = DynamicYieldMapper.mapChooseResponseToProducts(resultBody);
    } catch (e) {
      console.error(e);
    }
    return items;
  }
}
