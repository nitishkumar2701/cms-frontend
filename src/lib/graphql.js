export async function fetchGraphQL(query, variables = {}) {
  // Ensure your .env.local file has NEXT_PUBLIC_GRAPHQL_URL set!
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL;

  if (!endpoint) {
    throw new Error("NEXT_PUBLIC_GRAPHQL_URL is missing in .env.local");
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    // NEW: Cache the data indefinitely until the webhook clears it!
    cache: "force-cache" 
  });
  
  const json = await res.json();
  
  if (json.errors) {
    console.error("GraphQL Errors:", json.errors);
    throw new Error("Failed to fetch API");
  }
  
  return json.data;
}