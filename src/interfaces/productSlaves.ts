export interface IproductSlaves {
    id: number,
    title: string;
    price: number | string;
}


export interface IResponse { 
    id: number;
    title: string;
};


export interface IDataBase {
    courses: IResponse[]
}