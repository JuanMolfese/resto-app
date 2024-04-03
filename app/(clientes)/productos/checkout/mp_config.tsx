import { MercadoPagoConfig, Preference } from 'mercadopago';
import { redirect } from "next/navigation";


export default async function mp_config(compra:any){
  
  const client = new MercadoPagoConfig({ accessToken: "TEST-7843908738855744-032113-72aa8f0c34504429aedc3b0e85283530-814774283" });
  console.log(compra);

  const preference = new Preference(client).create({
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
  
    redirect((await preference).sandbox_init_point!);

}