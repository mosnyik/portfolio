import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  writeBatch,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Project } from "./types/projectsTypes";
import { Skill } from "./types/skillTypes";

export async function addProjectToFirebase(projectData: Project) {
  try {
    const docRef = await addDoc(collection(db, "projects"), projectData);
    console.log("Document written with ID: ", docRef.id);
    return {
      success: true,
      message: "Project added successfully",
      id: docRef.id,
    };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { success: false, message: "Error adding project" };
  }
}

export async function getProjectsFromFirebase(): Promise<Project[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projects: Project[] = [];
    querySnapshot.forEach((doc) => {
      projects.push(doc.data() as Project);
    });
    return projects;
  } catch (e) {
    console.error("Error getting documents: ", e);
    return [];
  }
}

export async function addSkillsToFirebase(skills: string[]) {
  try {
    const batch = writeBatch(db);
    const skillsRef = collection(db, "skills");

    for (const skill of skills) {
      const newSkillRef = doc(skillsRef);
      batch.set(newSkillRef, { name: skill });
    }

    await batch.commit();
    console.log(`${skills.length} skill(s) added successfully`);
    return {
      success: true,
      message: `${skills.length} skill(s) added successfully`,
    };
  } catch (e) {
    console.error("Error adding skills: ", e);
    return { success: false, message: "Error adding skills" };
  }
}

export async function getSkillsFromFirebase(): Promise<Skill[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "skills"));
    const skills: Skill[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name as string,
    }));
    return skills;
  } catch (e) {
    console.error("Error getting skills: ", e);
    throw e;
  }
}

export async function updateSkillInFirebase(id: string, newName: string) {
  try {
    const skillRef = doc(db, "skills", id);
    await updateDoc(skillRef, { name: newName });
    return { success: true, message: "Skill updated successfully" };
  } catch (e) {
    console.error("Error updating skill: ", e);
    return { success: false, message: "Error updating skill" };
  }
}

export async function deleteSkillFromFirebase(id: string) {
  try {
    const skillRef = doc(db, "skills", id);
    await deleteDoc(skillRef);
    return { success: true, message: "Skill deleted successfully" };
  } catch (e) {
    console.error("Error deleting skill: ", e);
    return { success: false, message: "Error deleting skill" };
  }
}
