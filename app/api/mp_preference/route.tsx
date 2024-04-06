import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(){
  
  try {
    const preference = await new Preference(client)
      .create({
              body: {
                items:[
                  {
                    id:"Compra",
                    category_id: "Resto",
                    description:"Compra description",
                    title: "Compra en El Balcon",
                    quantity: 1,
                    unit_price: Number (1500)
                  },
                ],
                /* back_urls: {
                  success: `${process.env.NEXT_PUBLIC_SITE}/success`,
                  failure: `${process.env.NEXT_PUBLIC_SITE}/failure`,
                  pending: `${process.env.NEXT_PUBLIC_SITE}/pending`
                }, */
                notification_url:"https://04658vr5-3000.brs.devtunnels.ms/api/payment?source_news=ipn",
                external_reference: "id_cliente", //para relacionar con un 
                metadata:{
                  //aca puedo indicar info que me sirva para trabajar luego q se procese el pago, ya que estara incluida en la respuesta del payment
                  id_usuario:"2",
                  cart_id:"1",
                }
                /* auto_return: "approved" */
              }
            });
    // Enviar la preferencia como respuesta
   /*  return NextResponse.json({data:preference},{status: 200});  */
   console.log(preference);
   if (preference.id !== undefined){
    redirect(preference.init_point!);
   }else{
    throw Error("Error al crear la preferencia");
   }
  } catch (error) {
    // Manejar cualquier error que ocurra
    return NextResponse.json({error: error},{status: 500});
  }
}