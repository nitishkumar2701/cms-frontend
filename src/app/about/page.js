import { fetchGraphQL } from "../../lib/graphql";
import Link from "next/link";

const GET_ABOUT_CONTENT = `
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

export default async function AboutPage() {
  const data = await fetchGraphQL(GET_ABOUT_CONTENT);
  // Find the specific content block for the About page
  const aboutData = data.pageContents.find(c => c.sectionId === "about") || {};

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-blue-50 py-20 border-b">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            {aboutData.sectionTitle || "About IRE Homes"}
          </h1>
          <p className="text-xl text-gray-600">
            {aboutData.sectionSubtitle || "Building communities and finding dream homes since 2010."}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 py-16 flex flex-col lg:flex-row gap-16 items-center">
        {aboutData.imageUrl && (
          <div className="lg:w-1/2">
            <img 
              src={aboutData.imageUrl} 
              alt="About Us" 
              className="rounded-2xl shadow-xl w-full h-auto object-cover" 
            />
          </div>
        )}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
          <div className="text-gray-600 text-lg leading-relaxed space-y-4">
            {aboutData.sectionBody ? (
              <p>{aboutData.sectionBody}</p>
            ) : (
              <p>We are a premier real estate agency dedicated to helping you find the perfect property. Our team of experts brings years of experience and a passion for matching people with their ideal homes.</p>
            )}
          </div>
          <div className="pt-4">
            <Link href="/contact" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}