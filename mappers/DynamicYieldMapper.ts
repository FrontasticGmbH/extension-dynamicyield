import { Money } from '../../../types/content/dynamicyield/Money';
import { Product } from '../../../types/content/dynamicyield/Product';
import { Slot } from '../../../types/content/dynamicyield/Slot';

export class DynamicYieldMapper {
  static mapChooseResponseToProducts(result: any): Product[] {
    const products: any = [];
    const resultJson = JSON.parse(result);
    const variation = resultJson?.choices[0]?.variations[0];
    const slots = variation?.payload?.data?.slots;
    slots.forEach((slotItem: Slot) => {
      const price: Money = {
        fractionDigits: 2,
        centAmount: slotItem?.productData?.price,
      };

      const product: Product = {
        sku: slotItem?.sku,
        name: slotItem?.productData?.name,
        description: slotItem?.productData?.description,
        url: slotItem?.productData?.url,
        imageUrl: slotItem?.productData?.image_url,
        categories: slotItem?.productData?.categories,
        productType: slotItem?.productData?.group_id,
        price: price,
      };
      products.push(product);
    });
    return products;
  }
}
