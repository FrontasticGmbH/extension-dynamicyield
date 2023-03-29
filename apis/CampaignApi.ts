import {Request} from '@frontastic/extension-types';


export default class CampaignApi {

  constructor() {

  }


  getDyContext(req: Request) {
    const dyContext = {
      page: {
        location: `https://${req?.hostname}${req?.path}`,
        referrer: req.headers.referer || '',
        data: [],
      },
      device: {
        userAgent: req?.headers['user-agent'] || '',
        ip: req?.clientIp,
      },
      pageAttributes: req?.query,
    }
    return dyContext
  }
}
