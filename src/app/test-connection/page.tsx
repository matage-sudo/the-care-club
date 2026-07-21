import { supabase } from '@/lib/supabase';

export default async function TestConnectionPage() {
  const tables = ['events', 'donations', 'volunteers', 'members'];
  
  // Try to fetch 1 row from each table to check connection
  const results = await Promise.all(
    tables.map(async (table) => {
      const { data, error } = await supabase.from(table).select('*').limit(1);
      return { table, error };
    })
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Database Connection Status</h1>
      {results.map(({ table, error }) => (
        <div key={table} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>
          <strong>Table: {table}</strong> - {error ? 
            <span style={{ color: 'red' }}>Error: {error.message}</span> : 
            <span style={{ color: 'green' }}>Connected Successfully</span>
          }
        </div>
      ))}
    </div>
  );
}
