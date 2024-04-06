//Aqui recibiremos los avisos una vez que se concrete un pago en MERCADO PAGO
import type { NextRequest } from "next/server";
import {MercadoPagoConfig, Payment} from "mercadopago";


const mercadopago = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});

export async function POST(request: NextRequest) {
  
  if(request.nextUrl.searchParams.get('topic' ) !== 'payment') 
    return Response.json({success: true}); //Siempre informar a MP que recibi la notificacion.
  if(request.nextUrl.searchParams.get('source_news' ) !== 'ipn') 
    return Response.json({success: true});
  
  const paymentId = request.nextUrl.searchParams.get('id');
  
  new Promise<void> ( async (resolve, reject) => {
    const payment = await new Payment(mercadopago).get({id: parseFloat(paymentId!)} );      
    if (payment.status != 'approved'){
      return Response.json({success: true});
    }      
    const pedido = {
      id: payment.id,
      amount: payment.transaction_amount,
      net_amount: payment.transaction_details?.net_received_amount,
      message: payment.description,
      status: payment.status,
      payer_email: payment.payer?.email,
      payer_first_name: payment.payer?.first_name,
      payer_last_name: payment.payer?.last_name,
      payer_dni: payment.payer?.identification?.number,
      payer_phone: payment.payer?.phone?.area_code + "-" + payment.payer?.phone?.number,
      //y demas info que sea necesaria
    };   
    console.log("===== PEYMENT=======");
    console.log(payment);
    console.log("===== PEDIDO=======");
    console.log(pedido);
    
  })  
    //cargar en BBDD el pedido, payment y demas info necesaria
    //await pedido.insert(pedido)

    //Es importante que en paralelo a la promise que se ejecuta arriba se le envie a MP el response OK, ya que hay un tiempo limite para informarles que recibimos la notificacion
    return Response.json({success: true});
}