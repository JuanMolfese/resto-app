//Aqui recibiremos los avisos una vez que se concrete un pago en MERCADO PAGO
import type { NextRequest } from "next/server";
import {MercadoPagoConfig, Payment} from "mercadopago";

const mercadopago = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});

export async function POST(request: NextRequest){

    const body = await request.json().
                then((data) => data as {data: {id: string}});

    const payment = await new Payment(mercadopago).get({id: body.data.id});
  
    //aqui se tendria que gestionar la grabacion en la bbdd del pago y la generacion del pedido.
    
    console.log("body: ", body);
    console.log("payment: ", payment);
    
    return Response.json({success: true});
}