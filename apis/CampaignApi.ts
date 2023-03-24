
import { Context } from '@frontastic/extension-types';

export default class CampaignApi {
  private client: any;
  private locale: string;

  constructor(frontasticContext: Context, locale?: string) {

  }

  private formatLocale(locale: string) {
    return locale.replace('_', '-');
  }
}
