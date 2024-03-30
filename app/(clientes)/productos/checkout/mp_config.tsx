import { MercadoPagoConfig, Preference } from 'mercadopago';
import { redirect } from "next/navigation";

const client = new MercadoPagoConfig({ accessToken: "TEST-7843908738855744-032113-72aa8f0c34504429aedc3b0e85283530-814774283" });

export default async function mp_config(compra:any){

  console.log(compra);

    const preference = await new Preference(client).create({
      body: {
        items:[
          {
            id:compra.id,
            title: compra.title,
            quantity: compra.quantity,
            unit_price: Number(compra.unit_price),
          },
        ],
      },      
    });
    console.log(preference);
    
    redirect(preference.sandbox_init_point!);

}