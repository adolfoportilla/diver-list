// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mail = require("@sendgrid/mail");

//Todo: populate the "to" field with the diveshop config email

mail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);
export default function handler(req, res) {
  const reservationInfo = JSON.parse(req.body);
  console.log(reservationInfo.isDiverCertified, "herere");
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
          name: `${reservationInfo.diverInformation.name} ${reservationInfo.diverInformation.lastName}`,
          date: reservationInfo.date,
          reservation_type: reservationInfo.reservationType,
          certified_diver: reservationInfo.isDiverCertified,
          number_of_dives: reservationInfo.numberOfDives,
          deepest_dive: reservationInfo.deepestDive,
          last_dive: reservationInfo.lastDive,
          equipment: "yes",
        },
      },
    ],
    template_id: "d-e920d954dafe4742a7e52be97a86afe2",
  };
  mail.send(data);
  res.status(200).json({ status: "OK" });
}
