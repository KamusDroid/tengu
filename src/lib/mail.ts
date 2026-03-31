import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // TLS en puerto 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ─── Tipos ───────────────────────────────────────────────

interface OrderEmailData {
  to: string;
  customerName: string;
  orderId: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
}

interface WelcomeEmailData {
  to: string;
  name: string;
}

// ─── Helper interno ───────────────────────────────────────

async function sendEmail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  });
}

// ─── 1. Confirmación de pago al cliente ──────────────────

export async function sendOrderConfirmationToCustomer(data: OrderEmailData) {
  const itemsHtml = data.items
    .map(
      (i) =>
        `<tr>
          <td style="padding:8px;border-bottom:1px solid #eee">${i.name}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${i.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">$${i.price.toFixed(2)}</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto">
      <h2 style="color:#1a1a1a">¡Tu compra fue confirmada! 🎉</h2>
      <p>Hola <strong>${data.customerName}</strong>, recibimos tu pago correctamente.</p>
      <p><strong>Orden #${data.orderId}</strong></p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0">
        <thead>
          <tr style="background:#f5f5f5">
            <th style="padding:8px;text-align:left">Producto</th>
            <th style="padding:8px;text-align:center">Cant.</th>
            <th style="padding:8px;text-align:right">Precio</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding:8px;text-align:right"><strong>Total:</strong></td>
            <td style="padding:8px;text-align:right"><strong>$${data.total.toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>
      <p>Nos pondremos en contacto para coordinar la entrega.</p>
      <p style="color:#888;font-size:12px">Tengu — ventas@tengu.com.ar</p>
    </div>`;

  await sendEmail(data.to, `Confirmación de tu orden #${data.orderId} — Tengu`, html);
}

// ─── 2. Notificación al admin por nueva orden ─────────────

export async function sendNewOrderNotificationToAdmin(data: OrderEmailData) {
  const itemsHtml = data.items
    .map((i) => `<li>${i.name} x${i.quantity} — $${i.price.toFixed(2)}</li>`)
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto">
      <h2 style="color:#1a1a1a">Nueva orden recibida 🛒</h2>
      <p><strong>Orden #${data.orderId}</strong></p>
      <p><strong>Cliente:</strong> ${data.customerName} (${data.to})</p>
      <ul>${itemsHtml}</ul>
      <p><strong>Total: $${data.total.toFixed(2)}</strong></p>
    </div>`;

  await sendEmail(
    process.env.ADMIN_EMAIL!,
    `Nueva orden #${data.orderId} de ${data.customerName}`,
    html
  );
}

// ─── 3. Bienvenida al registrarse ────────────────────────

export async function sendWelcomeEmail(data: WelcomeEmailData) {
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto">
      <h2 style="color:#1a1a1a">¡Bienvenido/a a Tengu, ${data.name}! 👋</h2>
      <p>Tu cuenta fue creada exitosamente.</p>
      <p>Ya podés explorar nuestro catálogo y realizar tus compras.</p>
      <p style="color:#888;font-size:12px">Tengu — ventas@tengu.com.ar</p>
    </div>`;

  await sendEmail(data.to, "¡Bienvenido/a a Tengu!", html);
}

// ─── 4. Aviso de creación de usuario nuevo al admin ───────

export async function sendNewUserAlertToAdmin(data: WelcomeEmailData) {
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto">
      <h2 style="color:#1a1a1a">Nuevo usuario registrado 👤</h2>
      <p><strong>Nombre:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.to}</p>
      <p><strong>Fecha:</strong> ${new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" })}</p>
    </div>`;

  await sendEmail(
    process.env.ADMIN_EMAIL!,
    `Nuevo usuario: ${data.name} (${data.to})`,
    html
  );
}