import { NextRequest, NextResponse} from "next/server";
import { connectdb } from "../../utils/models/db";

import io from 'socket.io-client';
const socket = io(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000');

export async function POST(request: NextRequest) {
  let connection;
  try{

    const order = await request.json();

    const pedido = {
      amount: order.cart_price,
      payer_name: order.name,      
      payer_address: order.address,
      delivery_method: order.option,
      cart: JSON.stringify(order.cart),
      pago:"false",
    }; 
    
    try {
      connection = await connectdb.getConnection();
      const [resultPedido] = await connection.execute<any>(
        `INSERT INTO Pedido (pago, modo_entrega_id, payer_first_name, payer_address, total) VALUES (?, ?, ?, ?, ?)`,
        [
          false,
          pedido.delivery_method === "delivery" ? 1 : 2,
          pedido.payer_name,
          pedido.payer_address,
          pedido.amount
        ]
      );
      const pedidoCart = JSON.parse(pedido.cart);
      for (const item of pedidoCart) {
        await connection.execute<any>(
          `INSERT INTO Pedido_Productos (pedido_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)`,
          [resultPedido.insertId, item.id, item.cantidad, item.precio]
        );
      }
    }
    catch (error) {
      console.log("Error al insertar el pedido en la base de datos", error);
      return NextResponse.json({ success: false, message: "Error al insertar el pedido en la base de datos" });
    }
    socket.emit('addPedido', 'Sync Process Completed');
    //cargar en BBDD el pedido, payment y demas info necesaria
    //await pedido.insert(pedido)
    
    return NextResponse.json({ success: true, result: order });
  }
  catch (error) {
    console.log("Error al procesar la solicitud", error);
    return NextResponse.json({ success: false, message: "Error al procesar la solicitud" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}