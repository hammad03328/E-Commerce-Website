import { defineField,defineType } from "sanity"
import {Category} from './Category'
export const Product=defineType(
    {
        name:"Product",
        title: "Product Name",
        type:"document",
        fields:
        [
            defineField({
            name: "Name",
            title:"Product Name",
            type:"string"
            }),
            defineField({
            name: "price",
            title:"Product Price",
            type:"number"
            }),
            defineField({
            name: "image",
            title:"Product Image",
            type:"image"
            }),
            defineField({
                name: "Category",
                title: "Category",
                type: "reference",
                to: [{type: 'Category'}],
              }),
            defineField({
                name: "Prod_for",
                title: "Prod_for",
                type: "reference",
                to: [{type: 'Prod_for'}],
              }),

            defineField({
            name : 'content',
            type : 'array',
            title: 'Product Description',
            of: [
              {
                type: 'block'
              }
            ]}),
            defineField({
            name : 'care',
            type : 'array',
            title: 'Product Care',
            of: [
              {
                type: 'block'
              }
            ]}),
        ]
    }
)