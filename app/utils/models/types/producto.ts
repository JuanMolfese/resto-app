export type Producto = {
    id: number;
    nombre: string;
    subrubro_id: number; // No faltaria precio ?
};
  
export type ProductoDetail = {
    id: number;
    nombre: string;
    descripcion: string;
    stock: number;
    precio: number;
    subrubro_id: number;
    subrubro_nombre: string;
    rubro_id: number;
    rubro_nombre: string;
}
