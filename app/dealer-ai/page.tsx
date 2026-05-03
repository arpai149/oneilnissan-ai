import { getDealerAiDashboard } from "@/lib/dealer-ai/dashboard";


export default async function DealerAiPage() {
  const data = await getDealerAiDashboard();

  return (
    <main className="container" style={{ padding: '28px 0 40px' }}>
      <h1>Dealer AI MVP Dashboard</h1>
      <p>{data.note}</p>

      <section className="grid grid-3" style={{ paddingTop: 12 }}>
        <div className="card"><h3>Total Leads</h3><p>{data.totals.totalLeads}</p></div>
        <div className="card"><h3>High Risk Leads</h3><p>{data.totals.highRiskLeads}</p></div>
        <div className="card"><h3>New Leads</h3><p>{data.totals.newLeads}</p></div>
      </section>

      <section>
        <div className="card">
          <h2>Lead Queue</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th align="left">Lead</th><th align="left">Status</th><th align="left">Source</th><th align="left">Needs Attention</th>
              </tr>
            </thead>
            <tbody>
              {data.leads.map((lead: any) => (
                <tr key={lead.id} style={{ borderTop: '1px solid #dbe6f8' }}>
                  <td style={{ padding: '8px 0' }}>{lead.name}<br /><small className="muted">{lead.email}</small></td>
                  <td>{lead.status}</td>
                  <td>{lead.source}</td>
                  <td>{lead.risk.needsAttention ? '⚠️ Yes' : '✅ No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
