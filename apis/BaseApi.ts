// @ts-ignore
import { Context } from '@frontastic/extension-types';
import { Guid } from '@Commerce-commercetools/utils/Guid';

interface Client {
  apiKey: string;
  url: string;
}

interface SessionToken {
  sessionId: string;
  expirationTime: number;
}

const sessionTokeStored = new Map<string, SessionToken>();
const sessionTimeoutInMillisecond = 60 * 60 * 1000; // 1-hour

export default class BaseApi {
  private dyClient: Client;
  private sessionToken: SessionToken;
  private userId: string;

  constructor(frontasticContext: Context, userId: string) {
    this.userId = userId;
    this.dyClient = this.createDyClient(frontasticContext);
    this.sessionToken = sessionTokeStored.get(userId);
    if (!this.sessionToken || this.isSessionExpired(this.sessionToken)) {
      const newSessionToken = {
        sessionId: Guid.newGuid(),
        expirationTime: Date.now() + sessionTimeoutInMillisecond,
      };
      sessionTokeStored.set(userId, newSessionToken);
    }
  }

  private isSessionExpired(sessionToken: SessionToken): boolean {
    const expirationTime = sessionToken.expirationTime;
    if (Date.now() >= expirationTime) {
      return true;
    }
    return false;
  }

  public getSessionId(): string {
    const sessionToken = sessionTokeStored.get(this.userId);
    return sessionToken.sessionId;
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
