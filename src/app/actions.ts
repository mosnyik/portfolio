"use server";

import {
  addProjectToFirebase,
  addSkillsToFirebase,
  deleteSkillFromFirebase,
  getSkillsFromFirebase,
  updateSkillInFirebase,
} from "../firebaseOps";

import { Project } from "@/types/projectsTypes";
import { Skill } from "@/types/skillTypes";
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
  const processScreenshots = (
    screenshots: string | null,
    dimensions: string
  ): string[] => {
    if (!screenshots) return [];
    const urls = JSON.parse(screenshots) as string[];
    return urls
      .map((url) => url.trim().replace(/,\s*$/, ""))
      .filter((url) => url !== "")
      .map((url) =>
        url.includes("?") ? `${url}&${dimensions}` : `${url}?${dimensions}`
      );
  };

  const webScreenshots = processScreenshots(
    formData.get("webScreenshots") as string | null,
    "height=600&width=800"
  );
  const mobileScreenshots = processScreenshots(
    formData.get("mobileScreenshots") as string | null,
    "height=600&width=300"
  );

  const project: Omit<Project, "webScreenshots" | "mobileScreenshots"> & {
    webScreenshots: string[];
    mobileScreenshots: string[];
  } = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    image: `${formData.get("image") as string}?height=300&width=400`,
    link: formData.get("link") as string,
    techStack: JSON.parse(formData.get("techStack") as string),
    webScreenshots: webScreenshots,
    mobileScreenshots: mobileScreenshots,
  };

  const result = await addProjectToFirebase(project);

  if (result.success) {
    revalidatePath("/");
  }

  return result;
}


export async function addSkills(formData: FormData) {
  const skillsInput = formData.get("skills")?.toString().trim() || "";
  if (!skillsInput) {
    return { success: false, message: "Skills cannot be empty" };
  }

  const skills = skillsInput
    .split(",")
    .map((skill) => skill.trim())
    .filter((skill) => skill !== "");

  if (skills.length === 0) {
    return { success: false, message: "No valid skills provided" };
  }

  try {
    const result = await addSkillsToFirebase(skills);
    if (result.success) {
      revalidatePath("/");
    }
    return result;
  } catch (error) {
    console.error("Error in addSkills:", error);
    return { success: false, message: "An error occurred while adding skills" };
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const skills = await getSkillsFromFirebase();
    return skills;
  } catch (error) {
    console.error("Error in getSkills:", error);
    return [];
  }
}

export async function updateSkill(formData: FormData) {
  const id = formData.get("id")?.toString() || "";
  const newName = formData.get("newName")?.toString().trim() || "";

  if (!id || !newName) {
    return { success: false, message: "Invalid skill data" };
  }

  try {
    const result = await updateSkillInFirebase(id, newName);
    if (result.success) {
      revalidatePath("/");
    }
    return result;
  } catch (error) {
    console.error("Error in updateSkill:", error);
    return {
      success: false,
      message: "An error occurred while updating the skill",
    };
  }
}

export async function deleteSkill(formData: FormData) {
  const id = formData.get("id")?.toString() || "";

  if (!id) {
    return { success: false, message: "Invalid skill ID" };
  }

  try {
    const result = await deleteSkillFromFirebase(id);
    if (result.success) {
      revalidatePath("/");
    }
    return result;
  } catch (error) {
    console.error("Error in deleteSkill:", error);
    return {
      success: false,
      message: "An error occurred while deleting the skill",
    };
  }
}
