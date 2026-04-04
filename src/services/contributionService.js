import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function getMemberContributions(memberId) {
  const q = query(
    collection(db, "contributions"),
    where("memberId", "==", memberId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}