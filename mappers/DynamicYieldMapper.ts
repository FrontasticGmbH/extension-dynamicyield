
import {Product} from "../../../types/content/dynamicyield/Product";
import {Money} from "../../../types/content/dynamicyield/Money";

export class DynamicYieldMapper {

  static mapChooseResponseToProducts(result : any): Product[] {
    const products = []
    const resultJson = JSON.parse(result)
    const variation = resultJson.choices[0]?.variations[0]
    const slots = variation?.payload?.data?.slots

    slots.forEach(item => {
      console.log(item?.productData)
      const price : Money = {
        fractionDigits : 2,
        centAmount: item?.productData?.price
      }

      const product : Product = {
        sku : item?.sku,
        name: item?.productData?.name,
        description: item?.productData?.description,
        imageUrl: item?.productData?.image_url,
        categories: item?.productData?.categories,
        productType: item?.productData?.group_id,
        price: price
      }
      products.push(product)
    })
    return products
  }
}
