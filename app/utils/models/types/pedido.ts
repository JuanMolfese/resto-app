export type Pedido = {
    id: number;
    fecha_emision: Date;
    cliente_id: number;
    estado_pedido_id: number;
    estado_pedido_descripcion: string;
    fecha_finalizacion: number; //OJO no tendria que ser Date ?
    pago: number; // No encontre tinyint.
    modo_entrega_id: number;
    modo_entrega_descripcion: string;
    mp_id: number;
    payer_first_name: string;
    payer_last_name: string;
    payer_email: string;
    payer_dni: string;
    payer_phone: string;
    payer_address: string;
};
  