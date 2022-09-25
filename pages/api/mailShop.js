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
        dynamic_template_data: {
          name: `${reservationInfo.diverInformation.name} ${reservationInfo.diverInformation.lastName}`,
          date: reservationInfo.date,
          time: reservationInfo.time,
          email: reservationInfo.diverInformation.email,
          dive_type: reservationInfo.reservationType,
          number_of_dives: reservationInfo.numberOfDives,
          last_dive: reservationInfo.lastDive,
          deepest_dive: reservationInfo.deepestDive,
          equipment: reservationInfo.equipment,
        },
      },
    ],
    template_id: "d-d84efb6c71d2464f8760a16d7bb4395f",
  };
  mail.send(data);
  res.status(200).json({ status: "OK" });
}
