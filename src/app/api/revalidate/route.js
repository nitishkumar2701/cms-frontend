import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  // 1. Get the secret token from the URL query string
  const secret = request.nextUrl.searchParams.get("secret");
  
  // 2. Validate the token
  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    // 3. Clear the cache for the pages that display data
    revalidatePath("/news");
    revalidatePath("/house-types");
    revalidatePath("/"); 
    revalidatePath("/about");
    
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}