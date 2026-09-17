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

const features = [
  {
    title: "Curated Properties",
    text: "Every listing is vetted by our team so you only see homes worth seeing.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 11.5L12 4l9 7.5M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9" />
      </svg>
    ),
  },
  {
    title: "Prime Locations",
    text: "From city centers to quiet suburbs, find a home in the neighborhood you love.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.05-7-11a7 7 0 0114 0c0 4.95-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Trusted Guidance",
    text: "Our agents guide you from first viewing to closing day, no surprises.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2.5 2.5L16 9M12 3l8 3v6c0 4.5-3.2 8.3-8 9.5-4.8-1.2-8-5-8-9.5V6l8-3z" />
      </svg>
    ),
  },
];

export default async function HomePage() {
  const data = await fetchGraphQL(GET_HOME_CONTENT);
  const homeData = data.pageContents.find((c) => c.sectionId === "home") || {};

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
        {/* decorative blobs */}
        <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-blue-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-40 -left-32 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />

        <div className="relative container mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 space-y-7">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase bg-blue-50 px-3 py-1.5 rounded-full">
              Premium Real Estate
            </span>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900 tracking-tight">
              {homeData.sectionTitle || "Discover Your Dream Home"}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              {homeData.sectionSubtitle || "Premium properties tailored to your lifestyle."}
            </p>

            {homeData.sectionBody && (
              <p className="text-gray-500 leading-relaxed">{homeData.sectionBody}</p>
            )}

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/house-types"
                className="group bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-700 shadow-sm hover:shadow-lg transition-all inline-flex items-center gap-2"
              >
                View Properties
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
              <Link
                href="/about"
                className="bg-white text-gray-800 px-8 py-3.5 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>

          {homeData.imageUrl && (
            <div className="md:w-1/2 relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl -z-10 rotate-2" />
              <img
                src={homeData.imageUrl}
                alt="Home Hero"
                className="rounded-2xl shadow-2xl object-cover w-full h-[500px]"
              />

              {/* floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-6 py-4 flex items-center gap-4 border border-gray-100">
                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                  ⭐
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 leading-none mb-1">4.9/5</div>
                  <div className="text-xs text-gray-500">from 200+ happy clients</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

{/* Features */}
<section className="border-t border-gray-100 py-28">
  <div className="container mx-auto px-6 max-w-6xl">
    <div className="text-center mb-20">
      <span className="inline-block text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase mb-3">
        Why IRE Homes
      </span>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
        A better way to find home
      </h2>
    </div>

    <div className="grid md:grid-cols-3 gap-x-12 gap-y-16">
      {features.map((f) => (
        <div key={f.title} className="group relative">
          <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center mb-7 group-hover:border-blue-300 group-hover:bg-blue-50 transition-all duration-300">
            <div className="text-gray-400 group-hover:text-blue-600 transition-colors duration-300">
              {f.icon}
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
          <p className="text-gray-500 leading-relaxed">{f.text}</p>
          <div className="mt-6 h-px w-12 bg-gray-200 group-hover:w-20 group-hover:bg-blue-400 transition-all duration-300" />
        </div>
      ))}
    </div>
  </div>
</section>

      {/* CTA banner */}
      <section className="container mx-auto px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 px-8 py-16 md:px-16 text-center">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-2xl" />

          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to find your next home?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Browse our full collection of properties or get in touch with our team today.
            </p>
            <Link
              href="/house-types"
              className="inline-block bg-white text-blue-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-50 shadow-lg transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}