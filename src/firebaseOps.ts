import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  writeBatch,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  getCountFromServer,
} from "firebase/firestore";
import { Project } from "./types/projectsTypes";
import { Skill } from "./types/skillTypes";
import { Visit, Visitor, AnalyticsSummary, TrafficSource } from "./types/visitTypes";
import { setDoc, getDoc, increment } from "firebase/firestore";

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

// Visit tracking operations
export async function addVisitToFirebase(visitData: Omit<Visit, "id">) {
  try {
    // Add the visit record
    const docRef = await addDoc(collection(db, "visits"), {
      ...visitData,
      timestamp: Timestamp.fromDate(visitData.timestamp),
    });

    // Update or create visitor record
    await updateVisitorRecord(visitData);

    return { success: true, id: docRef.id };
  } catch (e) {
    console.error("Error recording visit: ", e);
    return { success: false, message: "Error recording visit" };
  }
}

async function updateVisitorRecord(visitData: Omit<Visit, "id">) {
  try {
    const visitorRef = doc(db, "visitors", visitData.visitorId);
    const visitorSnap = await getDoc(visitorRef);

    if (visitorSnap.exists()) {
      // Update existing visitor
      await updateDoc(visitorRef, {
        lastVisit: Timestamp.fromDate(visitData.timestamp),
        totalVisits: increment(1),
        country: visitData.country || visitorSnap.data().country,
        city: visitData.city || visitorSnap.data().city,
      });
    } else {
      // Create new visitor
      const visitor: Omit<Visitor, "id"> = {
        visitorId: visitData.visitorId,
        firstVisit: visitData.timestamp,
        lastVisit: visitData.timestamp,
        totalVisits: 1,
        country: visitData.country,
        city: visitData.city,
      };
      await setDoc(visitorRef, {
        ...visitor,
        firstVisit: Timestamp.fromDate(visitor.firstVisit),
        lastVisit: Timestamp.fromDate(visitor.lastVisit),
      });
    }

    // Update monthly visitor stats
    const monthKey = `${visitData.timestamp.getFullYear()}-${String(visitData.timestamp.getMonth() + 1).padStart(2, "0")}`;
    const monthlyRef = doc(db, "monthlyVisits", `${visitData.visitorId}_${monthKey}`);
    const monthlySnap = await getDoc(monthlyRef);

    if (monthlySnap.exists()) {
      await updateDoc(monthlyRef, {
        visitCount: increment(1),
      });
    } else {
      await setDoc(monthlyRef, {
        visitorId: visitData.visitorId,
        month: monthKey,
        visitCount: 1,
      });
    }
  } catch (e) {
    console.error("Error updating visitor record:", e);
  }
}

export async function getTotalVisitCount(): Promise<number> {
  try {
    const coll = collection(db, "visits");
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count;
  } catch (e) {
    console.error("Error getting visit count: ", e);
    return 0;
  }
}

export async function getMonthlyVisitCount(): Promise<number> {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const coll = collection(db, "visits");
    const q = query(
      coll,
      where("timestamp", ">=", Timestamp.fromDate(startOfMonth))
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (e) {
    console.error("Error getting monthly visits: ", e);
    return 0;
  }
}

export async function getSourceBreakdown(
  startDate?: Date
): Promise<Record<TrafficSource, number>> {
  try {
    const coll = collection(db, "visits");
    let q;

    if (startDate) {
      q = query(coll, where("timestamp", ">=", Timestamp.fromDate(startDate)));
    } else {
      q = query(coll);
    }

    const snapshot = await getDocs(q);
    const breakdown: Record<TrafficSource, number> = {
      social: 0,
      search: 0,
      blog: 0,
      direct: 0,
      other: 0,
    };

    snapshot.forEach((doc) => {
      const data = doc.data();
      const category = data.sourceCategory as TrafficSource;
      if (breakdown[category] !== undefined) {
        breakdown[category]++;
      }
    });

    return breakdown;
  } catch (e) {
    console.error("Error getting source breakdown: ", e);
    return { social: 0, search: 0, blog: 0, direct: 0, other: 0 };
  }
}

export async function getTopReferrers(
  limitCount: number = 10,
  startDate?: Date
): Promise<Array<{ name: string; count: number }>> {
  try {
    const coll = collection(db, "visits");
    let q;

    if (startDate) {
      q = query(coll, where("timestamp", ">=", Timestamp.fromDate(startDate)));
    } else {
      q = query(coll);
    }

    const snapshot = await getDocs(q);
    const referrerCounts: Record<string, number> = {};

    snapshot.forEach((doc) => {
      const data = doc.data();
      const sourceName = data.sourceName as string;
      referrerCounts[sourceName] = (referrerCounts[sourceName] || 0) + 1;
    });

    return Object.entries(referrerCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limitCount);
  } catch (e) {
    console.error("Error getting top referrers: ", e);
    return [];
  }
}

export async function getDailyVisits(
  days: number = 30
): Promise<Array<{ date: string; count: number }>> {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const coll = collection(db, "visits");
    const q = query(
      coll,
      where("timestamp", ">=", Timestamp.fromDate(startDate)),
      orderBy("timestamp", "asc")
    );

    const snapshot = await getDocs(q);
    const dailyCounts: Record<string, number> = {};

    snapshot.forEach((doc) => {
      const data = doc.data();
      const date = data.timestamp.toDate().toISOString().split("T")[0];
      dailyCounts[date] = (dailyCounts[date] || 0) + 1;
    });

    const result: Array<{ date: string; count: number }> = [];
    const currentDate = new Date(startDate);
    const endDate = new Date();

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split("T")[0];
      result.push({ date: dateStr, count: dailyCounts[dateStr] || 0 });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  } catch (e) {
    console.error("Error getting daily visits: ", e);
    return [];
  }
}

export async function getUniqueVisitorCount(): Promise<number> {
  try {
    const coll = collection(db, "visitors");
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count;
  } catch (e) {
    console.error("Error getting unique visitor count:", e);
    return 0;
  }
}

export async function getMonthlyUniqueVisitors(): Promise<number> {
  try {
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    const coll = collection(db, "monthlyVisits");
    const q = query(coll, where("month", "==", monthKey));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (e) {
    console.error("Error getting monthly unique visitors:", e);
    return 0;
  }
}

export async function getTopLocations(
  limitCount: number = 10,
  startDate?: Date
): Promise<Array<{ location: string; count: number }>> {
  try {
    const coll = collection(db, "visits");
    let q;

    if (startDate) {
      q = query(coll, where("timestamp", ">=", Timestamp.fromDate(startDate)));
    } else {
      q = query(coll);
    }

    const snapshot = await getDocs(q);
    const locationCounts: Record<string, number> = {};

    snapshot.forEach((doc) => {
      const data = doc.data();
      const country = data.country as string;
      if (country && country !== "Unknown" && country !== "Local") {
        const location = data.city && data.city !== "Unknown"
          ? `${data.city}, ${country}`
          : country;
        locationCounts[location] = (locationCounts[location] || 0) + 1;
      }
    });

    return Object.entries(locationCounts)
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limitCount);
  } catch (e) {
    console.error("Error getting top locations:", e);
    return [];
  }
}

export async function getRepeatVisitors(
  limitCount: number = 10
): Promise<Array<{ visitorId: string; visitCount: number; country?: string }>> {
  try {
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    const coll = collection(db, "monthlyVisits");
    const q = query(coll, where("month", "==", monthKey));
    const snapshot = await getDocs(q);

    const visitors: Array<{ visitorId: string; visitCount: number; country?: string }> = [];

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      if (data.visitCount > 1) {
        // Get visitor's country
        const visitorRef = doc(db, "visitors", data.visitorId);
        const visitorSnap = await getDoc(visitorRef);
        const country = visitorSnap.exists() ? visitorSnap.data().country : undefined;

        visitors.push({
          visitorId: data.visitorId.substring(0, 8) + "...", // Truncate for privacy
          visitCount: data.visitCount,
          country,
        });
      }
    }

    return visitors
      .sort((a, b) => b.visitCount - a.visitCount)
      .slice(0, limitCount);
  } catch (e) {
    console.error("Error getting repeat visitors:", e);
    return [];
  }
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalVisits,
    monthlyVisits,
    uniqueVisitors,
    monthlyUniqueVisitors,
    sourceBreakdown,
    topReferrers,
    topLocations,
    dailyVisits,
    repeatVisitors,
  ] = await Promise.all([
    getTotalVisitCount(),
    getMonthlyVisitCount(),
    getUniqueVisitorCount(),
    getMonthlyUniqueVisitors(),
    getSourceBreakdown(startOfMonth),
    getTopReferrers(10, startOfMonth),
    getTopLocations(10, startOfMonth),
    getDailyVisits(30),
    getRepeatVisitors(10),
  ]);

  return {
    totalVisits,
    monthlyVisits,
    uniqueVisitors,
    monthlyUniqueVisitors,
    sourceBreakdown,
    topReferrers,
    topLocations,
    dailyVisits,
    repeatVisitors,
  };
}
