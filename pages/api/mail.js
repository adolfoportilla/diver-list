// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default function handler(req, res) {
  const data = {
    to: "olyslager.willy@gmail.com",
    from: "testing@diverlist.com",
    subject: "Testing SendGrid",
    text: "It works!!",
  };
  mail.send(data);
  res.status(200).json({ status: "OK" });
}
