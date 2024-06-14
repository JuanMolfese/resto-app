import { NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
    
  try{

    const order = await request.json();
  
    console.log(order);
     const pedido = {
      amount: order.cart_price,
      payer_name: order.name,      
      payer_address: order.address,
      delivery_method: order.option,
      cart: JSON.stringify(order.cart),
      pago:"false",
    }; 
    console.log(pedido);
    
    //cargar en BBDD el pedido, payment y demas info necesaria
    //await pedido.insert(pedido)
    
    return NextResponse.json({ success: true, result: order });
  }
  catch (error) {
    console.log("Error al procesar la solicitud", error);
    return NextResponse.json({ success: false, message: "Error al procesar la solicitud" });
  }
}