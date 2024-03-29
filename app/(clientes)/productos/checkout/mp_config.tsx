import { MercadoPagoConfig, Preference } from 'mercadopago';
import { redirect } from "next/navigation";


export default async function mp_config(formData: FormData){

    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

    const preference = await new Preference(client)
    .create({
      body: {
        items:[{
          id:"compra",
          title: formData.get("productos") as string,
          quantity: 1,
          unit_price: Number(formData.get("amount")),
        },
      ],
      },      
    })
    redirect(preference.sandbox_init_point!);

}