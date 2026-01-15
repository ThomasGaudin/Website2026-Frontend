import { Resend } from "resend";

export async function POST(req) {
  try {
    const form = await req.formData();
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const message = String(form.get("message") || "");

    if (!name || !email || !message) {
      return Response.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    // mini anti-spam / validation basique
    if (message.length < 5 || message.length > 5000) {
      return Response.json(
        { ok: false, error: "Invalid message length" },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: `Contact <${process.env.CONTACT_FROM_EMAIL}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Nouveau message — ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return Response.redirect(new URL("/contact?sent=1", req.url), 303);
  } catch (err) {
    return Response.redirect(new URL("/contact?sent=0", req.url), 500);
  }
}
