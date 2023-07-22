import { defineType,defineField } from "sanity"
export const Prod_for=defineType(
    {
        name:"Prod_for",
        title: "Product for",
        type:"document",
        fields:
        [
            defineField({
            name: "Prod_for",
            title:"Product_for",
            type:"string"
            })
        ]
    });