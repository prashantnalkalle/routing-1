export interface Iproduct{
    title:string,
    category:string,
    id:string,
    image:string,
    price:number,
    rating:rating
   
}

export interface rating{
    count:number,
    rate:number
}

export interface Iresponce{
    [key:string] :Iproduct
}