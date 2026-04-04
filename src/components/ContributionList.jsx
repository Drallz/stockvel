import { useEffect, useState } from "react";
import { getMemberContributions } from "../services/contributionsService";
import { auth } from "../firebase";

export default function ContributionsList() {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    async function loadData() {
      const user = auth.currentUser;
      if (user) {
        const data = await getMemberContributions(user.uid);
        setContributions(data);
      }
    }
    loadData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {contributions.map(c => (
          <tr key={c.id}>
            <td>{c.createdAt.toDate().toLocaleDateString()}</td>
            <td>R {c.amount}</td>
            <td>{c.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}