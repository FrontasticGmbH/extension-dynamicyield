// @ts-ignore
import { Context } from '@frontastic/extension-types';

interface Client {
  apiKey: string;
  url: string;
}

export default class BaseApi {
  private dyClient: Client;
  private sessionId: string;
  private userId: string;

  constructor(frontasticContext: Context, userId: string, sessionId: string) {
    this.userId = userId;
    this.sessionId = sessionId;
    this.dyClient = this.createDyClient(frontasticContext);
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public getUserId(): string {
    return this.userId;
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
