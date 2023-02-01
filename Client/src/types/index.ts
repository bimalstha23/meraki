export  interface product {
    id: string | number,
    name: string,
    price: number,
    actualPrice:string,
    description: string,
    category: {
        name:string,
        id:string | number
    }
    Image:any,
    rating: number,
    numReviews: number,
    countInStock?: number,
    tags:[],
}

export  interface category {
    id: string | number,
    name: string,
    image: string,
    description: string,
}

export  interface Comment{
    id: string | number,
    productId: string | number,
    name: string,
    rating: number,
    comment: string,
    createdAt: string,
}

// export  interface cart {
//     id: string | number,
//     productId: string | number,
//     name: string,
//     image: string,
//     price: number,
//     qty: number,
//     uid: string | number,
// }



