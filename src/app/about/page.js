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
  const aboutData = data.pageContents.find((c) => c.sectionId === "about") || {};

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-24 border-b border-gray-100">
        {/* decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />

        <div className="relative container mx-auto px-6 text-center max-w-3xl">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase mb-4">
            Who We Are
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
            {aboutData.sectionTitle || "About IRE Homes"}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {aboutData.sectionSubtitle ||
              "Building communities and finding dream homes since 2010."}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 py-20 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {aboutData.imageUrl && (
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl -z-10 rotate-2" />
              <img
                src={aboutData.imageUrl}
                alt="About Us"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </div>
          )}

          <div className={`space-y-6 ${aboutData.imageUrl ? "lg:w-1/2" : "max-w-2xl mx-auto text-center"}`}>
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>

            <div className="text-gray-600 text-lg leading-relaxed space-y-4">
              {aboutData.sectionBody}
            </div>

            <div className={`pt-4 ${!aboutData.imageUrl ? "flex justify-center" : ""}`}>
              <Link
                href="/contact"
                className="group bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-700 shadow-sm hover:shadow-lg transition-all inline-flex items-center gap-2"
              >
                Get in Touch
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}