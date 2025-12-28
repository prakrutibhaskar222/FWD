
export const sendBookingReminderEmail = async ({
  to,
  booking,
  worker,
  otp
}) => {
  await transporter.sendMail({
    from: `"Coolie Services" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Service Reminder – Confirm with OTP",
    html: `
      <h2>Service Reminder</h2>

      <p>Your service is scheduled for <b>${booking.date}</b></p>

      <h3>Service Details</h3>
      <p>${booking.serviceTitle}</p>
      <p>Slot: ${booking.slot}</p>
      <p>Address: ${booking.address}</p>

      <h3>Assigned Worker</h3>
      <p>Name: ${worker?.name || "To be assigned"}</p>
      <p>Phone: ${worker?.phone || "Will be shared on service day"}</p>

      <h2 style="color:green">OTP: ${otp}</h2>

      <p>Please share this OTP with the worker before service starts.</p>
    `
  });
};
