"use server";

import { revalidatePath } from "next/cache";

import nodemailer from "nodemailer";

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "mosnyik@gmail.com",
    subject: `${name} Left A Message from Portfolio Website`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again.",
    };
  }
}




export async function addProject(formData: FormData) {
  // TODO: Implement project addition logic (e.g., save to database)
  console.log("Adding project:", Object.fromEntries(formData));
  revalidatePath("/"); // Revalidate the home page to show the new project
  return { success: true, message: "Project added successfully" };
}

export async function addSkill(formData: FormData) {
  // TODO: Implement skill addition logic (e.g., save to database)
  console.log("Adding skill:", formData.get("skill"));
  revalidatePath("/"); // Revalidate the home page to show the new skill
  return { success: true, message: "Skill added successfully" };
}