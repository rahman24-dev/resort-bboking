import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
  try {
    const response = await resend.emails.send({
      from: "Nature Heaven <onboarding@resend.dev>", // default working sender
      to: to,
      subject: subject,
      text: text,
    });

    console.log("Email sent:", response);
    return response;
  } catch (error) {
    console.error("Resend Error:", error);
    throw error;
  }
};

export default sendEmail;