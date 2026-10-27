
export interface Ires{
    name:string
}

export interface Iuser {
 id: string;
 Uid: string;
 name: string;
 role: string;
 experience: number;
 status: boolean;
 description: string;
 skills: string[];
 currentAddress:currentadd,
 permanentAddress: permanenetadd,
 imageUrl: string;
}


export interface currentadd{
     
 country: string;
 state: string;
 city: string;
 zipcode: string;
 
}

export interface permanenetadd{
 country: string;
 state: string;
 city: string;
 zipcode: string;
}