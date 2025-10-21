import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json();
    console.log(process.env.BREVO_API_KEY);
    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Dr. R N Gupta Clinic",
          email:
            process.env.BREVO_SENDER_EMAIL || "noreply@drrnguptaclinic.com",
        },
        to: [
          {
            email:
              process.env.BREVO_RECIPIENT_EMAIL || "info@drrnguptaclinic.com",
            name: "Dr. R N Gupta Clinic",
          },
        ],
        replyTo: {
          email: email,
          name: name,
        },
        subject: `New Contact Form Submission: ${subject}`,
        htmlContent: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!brevoResponse.ok) {
      const error = await brevoResponse.json();
      console.error("Brevo API error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
