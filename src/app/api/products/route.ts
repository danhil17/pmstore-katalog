import { getCatalog } from "@/lib/products";

export const revalidate = 60;

export async function GET() {
  const catalog = await getCatalog();
  return Response.json(catalog);
}
