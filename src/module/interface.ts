
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

export type userRole ="Admin"|'superAdmin'|'Candidate'

export interface login {
   email:string,
   message:string,
   token:string,
   userRole: userRole
}

// message: 'Login Successfully !!!', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…A3M30.Cu0eveP3e4Ql-sMwId48YihfpUWhqYRzdJ1yPqTaCec', userRole: 'superAdmin', email: 'may@gmail.com'}
// email
// : 
// "may@gmail.com"
// message
// : 
// "Login Successfully !!!"
// token
// : 
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I3OWYxNzUwMWNjOWNjN2ZiYjc4MjEiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3OTM2NDQ0NzMsImV4cCI6MTc5MzY0ODA3M30.Cu0eveP3e4Ql-sMwId48YihfpUWhqYRzdJ1yPqTaCec"
// userRole
// : 
// "superAdmin"