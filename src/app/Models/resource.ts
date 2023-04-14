export abstract class Resource{
    updatedBy? : number;
    updatedOn? : string | null;
    arName!: string;
    enName!: string;
    status!: number | boolean;
    id?: number;
    
    
    
}