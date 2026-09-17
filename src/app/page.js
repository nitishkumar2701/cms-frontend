import { fetchGraphQL } from "@/lib/graphql";
import Link from "next/link";

const GET_HOME_CONTENT = `
  query {
    pageContents {
      sectionId
      sectionTitle
      sectionSubtitle
      sectionBody
      imageUrl
    }
  }
`;

export default async function HomePage() {
  const data = await fetchGraphQL(GET_HOME_CONTENT);
  const homeData = data.pageContents.find(c => c.sectionId === "home") || {};

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            {homeData.sectionTitle || "Discover Your Dream Home"}
          </h1>
          <p className="text-xl text-gray-600">
            {homeData.sectionSubtitle || "Premium properties tailored to your lifestyle."}
          </p>
          <div className="text-gray-500 leading-relaxed">
            {homeData.sectionBody}
          </div>
          <div className="pt-4 flex gap-4">
            <Link href="/house-types" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              View Properties
            </Link>
            <Link href="/about" className="bg-gray-100 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
              Learn More
            </Link>
          </div>
        </div>
        {homeData.imageUrl && (
          <div className="md:w-1/2">
            <img src={homeData.imageUrl} alt="Home Hero" className="rounded-2xl shadow-2xl object-cover w-full h-[500px]" />
          </div>
        )}
      </div>
    </section>
  );
}