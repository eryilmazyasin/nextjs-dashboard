import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function listInvoices() {
  // Database sorgusu: Bu sorgu, invoices tablosundaki amount ve customers tablosundaki name sütunlarını seçer. Ayrıca, invoices tablosu ile customers tablosunu customer_id sütunu üzerinden birleştirir ve amount değeri 666 olan kayıtları filtreler.
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data;
}

export async function GET() {
  try {
    return Response.json(await listInvoices());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
