// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mail = require("@sendgrid/mail");

//Todo: populate fields with the diveshop config info

mail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);
export default function handler(req, res) {
  const reservationInfo = JSON.parse(req.body);
  const data = {
    from: {
      email: "olyslager.willy@gmail.com",
    },
    personalizations: [
      {
        to: [
          {
            email: "olyslager.willy@gmail.com",
          },
        ],
        dynamic_template_data: {
          booking_id: "2357632123",
          date: reservationInfo.date,
          dive_shop_name: "Ocean Nomads",
          dive_shop_address: "Cozumel, México. Zip.77600",
          phone: "+52 987 111 9872",
          whatsapp: "+52 1 987 871 4408",
          email: "oceannomads@gmail.com",
          reservation_type: reservationInfo.reservationType,
        },
      },
    ],
    template_id: "d-a75bf0bd75614f7a8f2cdab96f300175",
  };
  mail.send(data);
  res.status(200).json({ status: "OK" });
}
