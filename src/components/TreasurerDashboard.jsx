import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase'; 

function TreasurerDashboard({ currentGroupId = "group_001" }) {
  const [showFinancePanel, setShowFinancePanel] = useState(false);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatTimestamp = (ts) => {
    if (!ts) return null;
    try {
      const date = ts.toDate ? ts.toDate() : new Date(ts);
      return date.toLocaleString('en-ZA', { 
        day: 'numeric', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const fetchContributions = async () => {
      console.log("Fetching for Group ID:", currentGroupId);
      try {
        const q = query(
          collection(db, "Contributions"), 
          where("groupId", "==", currentGroupId)
        );

        const querySnapshot = await getDocs(q);
        console.log("Documents found:", querySnapshot.size);

        const fetchedData = querySnapshot.docs.map(d => ({
          id: d.id, 
          ...d.data() 
        }));

        setContributions(fetchedData);
      } catch (error) {
        console.error("Firebase Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [currentGroupId]);

  const isPaidOrCompleted = (status) => {
    const s = status?.toLowerCase();
    return s === 'paid' || s === 'completed';
  };

  const totalCollected = contributions.reduce((sum, c) => 
    sum + (isPaidOrCompleted(c.status) ? Number(c.amount) : 0), 0
  );
  
  const pendingContributions = contributions.filter(c => !isPaidOrCompleted(c.status));
  const pendingCount = pendingContributions.length;
  const nextRotation = '15 May 2026';

  const handleConfirm = async (id) => {
    try {
      const contributionRef = doc(db, "Contributions", id);
      const now = new Date();

      await updateDoc(contributionRef, {
        status: 'paid',
        confirmedAt: serverTimestamp()
      });

      setContributions(contributions.map(c =>
        c.id === id ? { ...c, status: 'paid', confirmedAt: now } : c
      ));

    } catch (error) {
      console.error("Confirm Error:", error);
      alert("Failed to confirm payment.");
    }
  };

  const handleFinanceAction = (e) => {
    e.preventDefault();
    setShowFinancePanel(false);
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif', backgroundColor: '#fefcf5', minHeight: '100vh' }}>
        <h3 style={{ color: '#1e4a2a' }}>Syncing Ledger...</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#fefcf5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
        
        <h2 style={{ color: '#1e4a2a', marginTop: '0' }}>Treasurer Dashboard</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>Audit-ready contribution tracking for {currentGroupId}.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ textAlign: 'center', padding: '1.5rem', border: '1px solid #eee', borderRadius: '15px' }}>
            <div style={{ fontSize: '2rem' }}>💰</div>
            <h3 style={{ margin: '10px 0' }}>Total Collected</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#2c6e2f', margin: 0 }}>R {totalCollected}</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', border: '1px solid #eee', borderRadius: '15px' }}>
            <div style={{ fontSize: '2rem' }}>👥</div>
            <h3 style={{ margin: '10px 0' }}>Total Records</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0 }}>{contributions.length}</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', border: '1px solid #eee', borderRadius: '15px' }}>
            <div style={{ fontSize: '2rem' }}>⏳</div>
            <h3 style={{ margin: '10px 0' }}>Pending</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#f4b942', margin: 0 }}>{pendingCount}</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', border: '1px solid #eee', borderRadius: '15px' }}>
            <div style={{ fontSize: '2rem' }}>📅</div>
            <h3 style={{ margin: '10px 0' }}>Next Payout</h3>
            <p style={{ fontWeight: 'bold', margin: 0 }}>{nextRotation}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <button onClick={() => setShowFinancePanel(!showFinancePanel)} style={{ backgroundColor: '#2c6e2f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            📊 Manage Finances
          </button>
          <button style={{ backgroundColor: '#f4b942', color: '#1e4a2a', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            💸 Record Payout
          </button>
        </div>

        {showFinancePanel && (
          <div style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #eee', borderRadius: '15px', backgroundColor: '#fafafa' }}>
            <h3 style={{ marginTop: 0 }}>Circle Finances</h3>
            <form onSubmit={handleFinanceAction}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Expense category:</label>
                <select style={{ width: '100%', padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc' }}>
                  <option>Meeting venue</option>
                  <option>Emergency fund</option>
                  <option>Investment</option>
                  <option>Other</option>
                </select>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Amount (R):</label>
                <input type="number" placeholder="0.00" style={{ width: '100%', padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={{ backgroundColor: '#2c6e2f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Save Transaction</button>
            </form>
          </div>
        )}

        {pendingCount > 0 && (
          <div style={{ marginBottom: '2rem', padding: '1.5rem', border: '2px solid #f4b942', borderRadius: '15px', backgroundColor: '#fffdf0' }}>
            <h3 style={{ marginTop: 0, color: '#1e4a2a' }}>⏳ Pending Payments ({pendingCount})</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f4b942' }}>
                    <th style={{ padding: '0.8rem' }}>Member</th>
                    <th style={{ padding: '0.8rem' }}>Amount</th>
                    <th style={{ padding: '0.8rem' }}>Due Date</th>
                    <th style={{ padding: '0.8rem' }}>Method</th>
                    <th style={{ padding: '0.8rem' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingContributions.map(c => (
                    <tr key={c.id} style={{ borderBottom: '1px solid #f4e8b0' }}>
                      <td style={{ padding: '0.8rem', fontWeight: '500' }}>{c.member || c.userId || 'Unknown User'}</td>
                      <td style={{ padding: '0.8rem' }}>R {c.amount}</td>
                      <td style={{ padding: '0.8rem', color: '#666' }}>{c.date || 'N/A'}</td>
                      <td style={{ padding: '0.8rem', color: '#666' }}>{c.paymentMethod || 'N/A'}</td>
                      <td style={{ padding: '0.8rem' }}>
                        <button
                          onClick={() => handleConfirm(c.id)}
                          style={{ backgroundColor: '#2c6e2f', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.8rem' }}
                        >
                          Confirm
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div style={{ padding: '1.5rem', border: '1px solid #eee', borderRadius: '15px' }}>
          <h3 style={{ marginTop: 0 }}>All Member Contributions</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #2c6e2f' }}>
                  <th style={{ padding: '1rem' }}>Member</th>
                  <th style={{ padding: '1rem' }}>Amount</th>
                  <th style={{ padding: '1rem' }}>Date Details</th>
                  <th style={{ padding: '1rem' }}>Method</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map(c => {
                  const paid = isPaidOrCompleted(c.status);
                  const statusStr = c.status?.toLowerCase() || 'pending';
                  const confTime = formatTimestamp(c.confirmedAt);
                  
                  return (
                    <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '1rem', fontWeight: '500' }}>{c.member || c.userId || 'Unknown User'}</td>
                      <td style={{ padding: '1rem' }}>R {c.amount}</td>
                      <td style={{ padding: '1rem', color: '#666' }}>
                        <div style={{ fontSize: '0.9rem' }}>Due: {c.date || 'N/A'}</div>
                        {confTime && (
                          <small style={{ color: '#2c6e2f', display: 'block', fontSize: '0.75rem', marginTop: '4px' }}>
                            ✅ Confirmed: {confTime}
                          </small>
                        )}
                      </td>
                      <td style={{ padding: '1rem', color: '#666' }}>{c.paymentMethod || 'N/A'}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          background: paid ? '#eefbef' : '#fff5f5',
                          color: paid ? '#2c6e2f' : '#721c24',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: 'bold'
                        }}>
                          {statusStr.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {!paid && (
                          <button 
                            onClick={() => handleConfirm(c.id)}
                            style={{ backgroundColor: '#2c6e2f', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.8rem' }}
                          >
                            Confirm
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TreasurerDashboard;