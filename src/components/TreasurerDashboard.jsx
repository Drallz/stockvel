import { useState } from 'react';

const TreasurerDashboard = () => {
  // Demo data
  const [showFinancePanel, setShowFinancePanel] = useState(false);
  const [contributions, setContributions] = useState([
    { id: 1, member: 'Nosipho L.', amount: 500, date: '2025-04-01', status: 'paid' },
    { id: 2, member: 'Thabo M.', amount: 500, date: '2025-04-01', status: 'paid' },
    { id: 3, member: 'Lerato S.', amount: 500, date: '2025-04-02', status: 'pending' },
    { id: 4, member: 'Sipho D.', amount: 500, date: '2025-04-02', status: 'paid' },
  ]);

  const totalContributions = contributions.reduce((sum, c) => sum + (c.status === 'paid' ? c.amount : 0), 0);
  const pendingCount = contributions.filter(c => c.status === 'pending').length;
  const members = 12;
  const nextRotation = '15 May 2025';

  const handleRecordPayout = () => {
    alert('💰 Payout recorded! (Demo) In production, this would save to the blockchain.');
  };

  const handleFinanceAction = (e) => {
    e.preventDefault();
    alert('✅ Finance action saved (demo). Actual integration would update the stokvel budget.');
    setShowFinancePanel(false);
  };

  return (
    <div className="dashboard">
      <h2>Treasurer Dashboard</h2>
      <p style={{ marginBottom: '2rem' }}>Manage contributions, payouts, and circle finances.</p>

      {/* Stats cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="dashboard-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem' }}>💰</div>
          <h3>Total Contributions</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--green)' }}>R{totalContributions}</p>
          <small>this month</small>
        </div>
        <div className="dashboard-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem' }}>👥</div>
          <h3>Active Members</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{members}</p>
        </div>
        <div className="dashboard-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem' }}>⏳</div>
          <h3>Pending</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--gold)' }}>{pendingCount}</p>
          <small>contributions</small>
        </div>
        <div className="dashboard-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem' }}>📅</div>
          <h3>Next Payout</h3>
          <p style={{ fontWeight: 'bold' }}>{nextRotation}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <button className="btn-primary" onClick={() => setShowFinancePanel(!showFinancePanel)}>
          📊 Manage Finances
        </button>
        <button className="btn-primary" onClick={handleRecordPayout} style={{ background: 'var(--gold)', color: 'var(--dark-green)' }}>
          💸 Record Payout
        </button>
      </div>

      {/* Finance panel (conditional) */}
      {showFinancePanel && (
        <div className="dashboard-card" style={{ marginBottom: '2rem' }}>
          <h3>Circle Finances</h3>
          <form onSubmit={handleFinanceAction}>
            <div style={{ marginBottom: '1rem' }}>
              <label>Expense category:</label>
              <select style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}>
                <option>Meeting venue</option>
                <option>Emergency fund</option>
                <option>Investment</option>
                <option>Other</option>
              </select>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Amount (R):</label>
              <input type="number" placeholder="0.00" style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Description:</label>
              <textarea rows="2" style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}></textarea>
            </div>
            <button type="submit" className="btn-primary">Save Transaction</button>
          </form>
        </div>
      )}

      {/* Recent contributions table */}
      <div className="dashboard-card">
        <h3>Recent Contributions</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Member</th>
                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Amount</th>
                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Date</th>
                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {contributions.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.5rem' }}>{c.member}</td>
                  <td style={{ padding: '0.5rem' }}>R{c.amount}</td>
                  <td style={{ padding: '0.5rem' }}>{c.date}</td>
                  <td style={{ padding: '0.5rem' }}>
                    <span style={{
                      background: c.status === 'paid' ? 'var(--green)' : 'var(--gold)',
                      color: 'white',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem'
                    }}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TreasurerDashboard;