// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mail = require("@sendgrid/mail");

//Todo: populate the "to" field with the diveshop config email

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
        dynamic_template_data: {},
      },
    ],
    template_id: "d-85c4fcb2e0f24c00998ad65f7143664d",
  };
  mail.send(data);
  res.status(200).json({ status: "OK" });
}
