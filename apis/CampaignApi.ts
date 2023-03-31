import {Request} from '@frontastic/extension-types';
import fetch from 'node-fetch';

const APIKEY = '973cbfa6b49b057f9fead41953899557beb49e14779504c0ee86316d66e8df2d'; // replace with your key
const DYHOST = 'https://dy-api.com';      // or .eu

export default class CampaignApi {

  async choose(userId, sessionId, dyContext, selectors = []) {
    const body = {
      selector: {
        names: [
          'HP Hero Banner'
        ],
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

    let response = {};
    let resultBody = {}
    try {
       response =  await fetch(url, {
        method: 'post',
        body : JSON.stringify(body),
        headers
      });
      resultBody = JSON.stringify(await response.json())
      console.log(`Choose response: ${resultBody}`);
    } catch (e) {
      console.log(e)
      console.error(`ERROR IN CHOOSE: ${e.message}`);
    }
    return resultBody;
  }


  constructor() {

  }

  getDyContext(req: Request) {
    const dyContext = {
      page: {
        location: `https://${req?.hostname}${req?.path}`,
        referrer: req.headers.referer || '',
        type : 'homepage',
        data: [],
      },
      device: {
        userAgent: req?.headers.userAgent || '',
        ip: req?.clientIp,
      },
      pageAttributes: req?.query,
    }
    return dyContext
  }
}
