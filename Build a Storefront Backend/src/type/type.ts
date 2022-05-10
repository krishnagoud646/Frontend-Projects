//###################/user/#############################
export type User={
    firstname:string;
    lastname:string;
    username:string
    password:string;

}

export type newUser={
    id:number,
    firstname:string,
    lastname:string,
    username:string,
    password:string;

}


export type showUser={
    id:number,
    firstname:string,
    lastname:string,
    username:string,

}

//################/product/##################
export type product={
    id:Number;
    name:string;
    price:number,
    category:string
}

export type createProduct={
    id:number;
    name:string;
    price:number;
    category:string
}

//####################/order/#################
export type order={
    id:Number;
    quantity:number;
    user_id:number;
    status:string;
}

export type createOrder={
    quantity:number;
    user_id:number;
    status:string;
}