// @ts-ignore
import { Context } from '@frontastic/extension-types';
import { Client } from '../../../types/content/dynamicyield/Client';

export default class BaseApi {
  private dyClient: Client;
  constructor(frontasticContext: Context) {
    this.dyClient = this.createDyClient(frontasticContext);
  }

  public getDyClient(): Client {
    return this.dyClient;
  }

  private createDyClient(frontasticContext: Context): Client {
    const configuration = frontasticContext.project.configuration;
    const dyConfiguration = configuration?.dynamicyield;
    const dyClient = {
      apiKey: dyConfiguration?.apiKey,
      url: `${dyConfiguration?.host}/v2/serve/user/choose`,
    };
    return dyClient;
  }
}
