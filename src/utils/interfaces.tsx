// Flower Details

export interface flowerDetails {
    value:rawData
    
  }


  //added Object 

  export interface addedObject {
        flowerId: string;
        flowerName: string;
        flowerUrl:string,
        flowerDate:string, 
        flowerTitle:string,
        flowerBody:string, 
        flowerPrice:string,
        flowerQty: number,
        flowerCategory:string,
       
  }

   //raw data 

   export interface rawData{id: string;
    name: string;
    url:string,
    date:string, 
    title:string,
    body:string, 
    price:string,
    qty:number,
    category:string,
    
    }

  

   //List of cart items 

   export interface listOfCartItems extends addedObject {
    
      
   }