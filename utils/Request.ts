import { Request } from '@frontastic/extension-types';

export const getPath = (request: Request): string | null => {
  return getHeader(request, 'frontastic-path') ?? request.query.path;
};

export const getLocale = (request?: Request): string | null => {
  if (request !== undefined) {
    const locale = getHeader(request, 'frontastic-locale') ?? request.query.locale;

    if (locale !== undefined) {
      return getHeader(request, 'frontastic-locale') ?? request.query.locale;
    }
  }

  return null;
};

export const getContext = (request: Request, pageContextType : string) =>  {
  const referrer : string | undefined = getHeader(request, 'referrer')
  const userAgent : string | undefined = getHeader(request, 'userAgent')

  const ip : string = request?.clientIp
  const data : any[] = []
  const hostname : string = request?.hostname
  const path : string = getPath(request)
  const query : string = request?.query

  const dyContext = {
    page: {
      location: `https://${hostname}${path}`,
      referrer: referrer || '',
      type : 'HOMEPAGE',
      data
    },
    device: {
      userAgent : userAgent || '',
      ip
    },
    pageAttributes: query,
  }
  console.log(dyContext)
  return dyContext
}

const getHeader = (request: Request, header: string): string | null => {
  if (request.headers && header in request.headers) {
    const foundHeader = request.headers[header];
    if (Array.isArray(foundHeader)) {
      return foundHeader[0];
    }
    return foundHeader;
  }

  return null;
};
