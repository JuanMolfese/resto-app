export type Pedido = {
    id: number;
    fecha_emision: Date;
    cliente_id: number;
    estado_pedido_id: number;
    fecha_finalizacion: number; //OJO no tendria que ser Date ?
    pago: number; // No encontre tinyint.
    modo_entrega_id: number;
};
  