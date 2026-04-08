import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function UserDashboard() {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const fetchContributions = async () => {
      if (!auth.currentUser) return;

      const q = query(
        collection(db, "contributions"),
        where("userId", "==", auth.currentUser.uid)
      );

      const snapshot = await getDocs(q);
      setContributions(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    };

    fetchContributions();
  }, []);

  return (
    <div className="page">
      <h2>My Contributions</h2>

      {contributions.length === 0 && <p>No contributions yet</p>}

      <ul>
        {contributions.map(c => (
          <li key={c.id}>
            R{c.amount} — {c.date}
          </li>
        ))}
      </ul>
    </div>
  );
}