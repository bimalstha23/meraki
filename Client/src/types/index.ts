export  interface product {
    id: string | number,
    name: string,
    price: number,
    actualPrice?:string,
    description: string,
    category: string,
    Image:string[],
    rating: number,
    numReviews?: number,
    countInStock?: number,
    tags:string[],
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


export interface filter{
    page:number,
    searchQuery:string,
    category:string,
    sortby:string,
    sortOrder: string,
}

