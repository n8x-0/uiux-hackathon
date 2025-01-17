// export const product0 = {
//     name: "product",
//     title: "Add product",
//     type: "document",
//     fields: [
//         {
//             name: "title",
//             title: "title",
//             type: "string"
//         },
//         {
//             name: "description",
//             title: "Description",
//             type: "string"
//         },
//         {
//             name: "image",
//             title: "Image",
//             type: "image"
//         },
//         {
//             name: "category",
//             title: "Category",
//             type: "string",
//             options: {
//                 list: [
//                     { title: `Men's`, value: 'mens' },
//                     { title: `Women's`, value: 'womens' },
//                     { title: `Kid's`, value: 'kids' },
//                     { title: 'Sale', value: 'sale' },
//                     { title: 'SNKRS', value: 'snkrs' },
//                 ],
//                 layout: 'dropdown',
//             }
//         },
//         {
//             name: "purpose",
//             title: "Made for | purpose",
//             type: "string"
//         },
//         {
//             name: "price",
//             title: "Price",
//             type: "number"
//         },
//         {
//             name: "size",
//             title: "Size",

//             type: "string",
//             options: {
//                 list: [
//                     { title: "Small (SM)", value: "sm" },
//                     { title: "Medium (MD)", value: "md" },
//                     { title: "Large (LG)", value: "lg" },
//                     { title: "Extra Large (XL)", value: "xl" },
//                 ],
//             },
//             layout: "checkbox",
//         },
//         {
//             name: "stock",
//             title: "stock",
//             type: "number"
//         },
//         {
//             title: 'Colors',
//             name: 'colors',
//             type: 'array',
//             of: [{ type: 'string' }],
//             options: {
//               layout: 'tags',
//             },
//           }

//     ]
// }

export const product0 = {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'productName',
            title: 'Product Name',
            type: 'string',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'inventory',
            title: 'Inventory',
            type: 'number',
        },
        {
            name: 'colors',
            title: 'Colors',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
    ],
}