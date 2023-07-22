import { type SchemaTypeDefinition } from 'sanity'
import { Product } from './Product'
import { Category } from './Category'
import { Prod_for } from './Prod_for'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Product,Category,Prod_for],
}
