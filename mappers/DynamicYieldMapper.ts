import { Money } from '@Types/product/Money';
import { Product } from '@Types/product/Product';
import { Variant } from '@Types/product/Variant';
import { Category } from '@Types/product/Category';

export interface Slot {
  sku: string;
  productData: {
    price: number;
    name: string;
    description: string;
    url: string;
    image_url: string;
    categories: any;
    group_id: string;
  };
}

export class DynamicYieldMapper {
  private static mapToVariants(slotItem: Slot, price: Money): Variant[] {
    const variants: Variant[] = [];
    const variant: Variant = {
      sku: slotItem?.sku,
      price: price,
      groupId: slotItem?.productData?.group_id,
      images: [slotItem?.productData?.image_url],
    };
    variants.push(variant);
    return variants;
  }

  private static mapToCategories(slotItem: Slot): Category[] {
    const categories: Category[] = [];
    const category: Category = {
      name: slotItem?.productData?.categories,
    };
    categories.push(category);
    return categories;
  }

  static mapChooseResponseToProducts(result: any): Product[] {
    const products: Product[] = [];
    const resultJson = JSON.parse(result);
    const variation = resultJson?.choices[0]?.variations[0];
    const slots = variation?.payload?.data?.slots;
    slots.forEach((slotItem: Slot) => {
      const price: Money = {
        fractionDigits: 2,
        centAmount: slotItem?.productData?.price,
      };
      const variants: Variant[] = this.mapToVariants(slotItem, price);
      const categories: Category[] = this.mapToCategories(slotItem);
      const product: Product = {
        name: slotItem?.productData?.name,
        description: slotItem?.productData?.description,
        _url: slotItem?.productData?.url,
        categories,
        variants,
      };
      products.push(product);
    });
    return products;
  }
}
