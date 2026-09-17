import { fetchGraphQL } from "@/lib/graphql";
import Link from "next/link";

const GET_HOME_CONTENT = `
  query {
    pageContents {
      title
      sectionId
      sectionTitle
      sectionSubtitle
      sectionBody
      imageUrl
    }
  }
`;

// Splits `'Quote text' - Author Name` into { quote, author }
function parseTestimonial(body) {
  if (!body) return { quote: "", author: "" };
  const match = body.match(/^['"]?(.*?)['"]?\s*-\s*(.+)$/s);
  if (!match) return { quote: body, author: "" };
  return { quote: match[1].trim(), author: match[2].trim() };
}

export default async function HomePage() {
  const data = await fetchGraphQL(GET_HOME_CONTENT);
  const contents = data.pageContents;

  const homeData = contents.find((c) => c.sectionId === "hero");
  const ctaData = contents.find((c) => c.sectionId === "banner");

  const testimonials = contents
    .filter((c) => c.sectionId?.startsWith("testimonials-"))
    .sort((a, b) => a.sectionId.localeCompare(b.sectionId));

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-blue-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-40 -left-32 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />

        <div className="relative container mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 space-y-7">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase bg-blue-50 px-3 py-1.5 rounded-full">
              Premium Real Estate
            </span>

            {homeData?.sectionTitle && (
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900 tracking-tight">
                {homeData.sectionTitle}
              </h1>
            )}

            {homeData?.sectionSubtitle && (
              <p className="text-xl text-gray-600 leading-relaxed">
                {homeData.sectionSubtitle}
              </p>
            )}

            {homeData?.sectionBody && (
              <div className="text-gray-500 leading-relaxed whitespace-pre-line space-y-4">
                {homeData.sectionBody}
              </div>
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

          {homeData?.imageUrl && (
            <div className="md:w-1/2 relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl -z-10 rotate-2" />
              <img
                src={homeData.imageUrl}
                alt={homeData.sectionTitle || "Home Hero"}
                className="rounded-2xl shadow-2xl object-cover w-full h-[500px]"
              />
            </div>
          )}
        </div>
      </section>

      {/* Testimonials — sourced from CMS (sectionId: testimonials-N) */}
      {testimonials.length > 0 && (
        <section className="border-t border-gray-100 py-28">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-20">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase mb-3">
                Testimonials
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                What Our Clients Say
              </h2>
            </div>

            <div
              className={`grid gap-x-12 gap-y-16 ${
                testimonials.length === 1
                  ? ""
                  : testimonials.length === 2
                  ? "md:grid-cols-2 max-w-4xl mx-auto"
                  : "md:grid-cols-3"
              }`}
            >
              {testimonials.map((t) => {
                const { quote, author } = parseTestimonial(t.sectionBody);
                return (
                  <div key={t.sectionId} className="group relative">
                    <svg
                      className="w-9 h-9 text-blue-100 group-hover:text-blue-200 transition-colors mb-5"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                    </svg>

                    {t.sectionTitle && (
                      <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
                        {t.sectionTitle}
                      </div>
                    )}

                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                      {quote}
                    </p>

                    {t.imageUrl ? (
                      <div className="flex items-center gap-3">
                        <img
                          src={t.imageUrl}
                          alt={author}
                          className="w-11 h-11 rounded-full object-cover"
                        />
                        <div className="font-semibold text-gray-900">{author}</div>
                      </div>
                    ) : (
                      <div className="font-semibold text-gray-900">{author}</div>
                    )}

                    <div className="mt-6 h-px w-12 bg-gray-200 group-hover:w-20 group-hover:bg-blue-400 transition-all duration-300" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA banner — sourced from CMS (Home Page Banner) */}
      {ctaData && (
        <section className="container mx-auto px-6 pb-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 px-8 py-16 md:px-16 text-center">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-2xl" />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {ctaData.sectionTitle}
              </h2>
              {(ctaData.sectionSubtitle || ctaData.sectionBody) && (
                <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                  {ctaData.sectionSubtitle || ctaData.sectionBody}
                </p>
              )}
              <Link
                href="/house-types"
                className="inline-block bg-white text-blue-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-50 shadow-lg transition-colors"
              >
                Browse Properties
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}