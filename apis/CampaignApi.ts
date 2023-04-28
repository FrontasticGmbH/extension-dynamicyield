// @ts-ignore
import fetch from 'node-fetch';
import { Context } from '@frontastic/extension-types';

export default class CampaignApi {
  private dyClient : any
  constructor(frontasticContext: Context) {
    this.dyClient = this.createDyClient(frontasticContext)
  }

  createDyClient(frontasticContext : Context) {
    const configuration = frontasticContext.project.configuration
    const dyConfiguration = configuration?.dynamicyield
    const dyClient =  {
      apiKey :  dyConfiguration?.apiKey,
      url :  `${dyConfiguration?.host}/v2/serve/user/choose`
    }
    return dyClient
  }

  async choose(userId : any, sessionId : any, dyContext : any, selectors : any[] = []) {
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
      context : dyContext
    }

    const
      headers=  {
        'dy-api-key': this.dyClient.apiKey,
        'Content-Type': 'application/json'
    }

    let response : any = {};
    let resultBody :any = {}
    try {
       response =  await fetch(this.dyClient.url, {
        method: 'post',
        body : JSON.stringify(body),
        headers
      });
      resultBody = JSON.stringify(await response.json())


    } catch (e) {
      console.error(e)
    }
    return resultBody;
  }


}
