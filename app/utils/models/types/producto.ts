export type Producto = {
    id: number;
    nombre: string;
    subrubro_id: number; 
    image: string;
};
  
export type ProductoDetail = {
    id: number;
    nombre: string;
    descripcion: string;
    stock: number;
    stock_minimo: number;
    precio: number;
    subrubro_id: number;
    subrubro_nombre: string;
    rubro_id: number;
    rubro_nombre: string;
    image: string;
}

export type ProductCart = {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
    subrubro_id: number; 
    image: string;
    stock: number;
};
