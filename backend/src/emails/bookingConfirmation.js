export const bookingConfirmationTemplate = (booking) => {
  return `
    <div style="font-family: Arial, sans-serif">
      <h2>✅ Booking Confirmed</h2>

      <p>Hi <strong>${booking.customerName}</strong>,</p>

      <p>Your booking has been successfully confirmed. Here are the details:</p>

      <table cellpadding="6">
        <tr><td><strong>Booking ID</strong></td><td>${booking._id}</td></tr>
        <tr><td><strong>Service</strong></td><td>${booking.serviceTitle}</td></tr>
        <tr><td><strong>Category</strong></td><td>${booking.serviceCategory}</td></tr>
        <tr><td><strong>Date</strong></td><td>${booking.date}</td></tr>
        <tr><td><strong>Time Slot</strong></td><td>${booking.slot}</td></tr>
        <tr><td><strong>Status</strong></td><td>${booking.status}</td></tr>
      </table>

      <p>
        We’ll notify you when the service professional is on the way.
      </p>

      <p>
        If you need help, contact us at <b>support@coolie.com</b>
      </p>

      <p>— Team COOLIE</p>
    </div>
  `;
};
