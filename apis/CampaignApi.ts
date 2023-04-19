import {Request} from '@frontastic/extension-types';
// @ts-ignore
import fetch from 'node-fetch';

const APIKEY = '973cbfa6b49b057f9fead41953899557beb49e14779504c0ee86316d66e8df2d'; // replace with your key
const DYHOST = 'https://dy-api.com';      // or .eu

export default class CampaignApi {

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

    const url = `https://dy-api.com/v2/serve/user/choose`
    const
      headers=  {
        'dy-api-key': APIKEY,
        'Content-Type': 'application/json'
    }

    let response : any = {};
    let resultBody :any = {}
    try {
       response =  await fetch(url, {
        method: 'post',
        body : JSON.stringify(body),
        headers
      });
      resultBody = JSON.stringify(await response.json())
      console.log(`================= Choose response: ${resultBody} ===================`);
    } catch (e) {
      console.log(e)
    }
    return resultBody;
  }


  constructor() {

  }

  getDyContext(req: Request) {
    const headers : Record<string, string> | [] =  req.headers


    // TODO : Assign value to referrer and userAgent
    // const referrer : string | undefined = headers.referrer
    const referrer : string = ''
    const userAgent : string = ''
    const ip : string = req?.clientIp
    const data : any[] = []
    const hostname : string = req?.hostname
    const path : string = req?.path
    const query : string = req?.query

    const dyContext = {
      page: {
        location: `https://${hostname}${path}`,
        referrer: referrer || '',
        type : 'homepage',
        data
      },
      device: {
        userAgent : userAgent || '',
        ip
      },
      pageAttributes: query,
    }
    return dyContext
  }
}
