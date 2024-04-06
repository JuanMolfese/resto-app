//Aqui recibiremos los avisos una vez que se concrete un pago en MERCADO PAGO
import type { NextRequest } from "next/server";
import {MercadoPagoConfig, Payment} from "mercadopago";


const mercadopago = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});

export async function POST(request: NextRequest) {
  
  if(request.nextUrl.searchParams.get('topic' ) !== 'payment') return Response.json({success: true}); //Siempre informar a MP que recibi la notificacion.
  if(request.nextUrl.searchParams.get('source_news' ) !== 'ipn') return Response.json({success: true});
  
  const paymentId = request.nextUrl.searchParams.get('id');
  
  new Promise<void> ( async (resolve, reject) => {
    const payment = await new Payment(mercadopago).get({id: parseFloat(paymentId!)} );      
    if (payment.status != 'approved'){
      return Response.json({success: true});
    }      
    const pedido = {
      id: payment.id,
      amount: payment.transaction_amount,
      message: payment.description,
      status: payment.status,
      //y demas info que sea necesaria
    };   
    console.log(payment);
    
  })  
    //cargar en BBDD el pedido, payment y demas info necesaria
    //await pedido.insert(pedido)
    return Response.json({success: true});
}