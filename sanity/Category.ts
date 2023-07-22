import { defineType,defineField } from "sanity"
export const Category=defineType(
    {
        name:"Category",
        title: "Product Category",
        type:"document",
        fields:
        [
            defineField({
            name: "Category",
            title:"Product Category",
            type:"string"
            })
        ]
    });