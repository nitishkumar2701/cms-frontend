import { fetchGraphQL } from "@/lib/graphql";

const GET_NEWS = `
  query {
    newsPosts {
      id
      title
      body
      authorName
      imageUrl
      category
      status
      publishedAt
    }
  }
`;

function formatDate(dateStr) {
  if (!dateStr) return "Recent";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function NewsPage() {
  const data = await fetchGraphQL(GET_NEWS);
  const publishedNews = data.newsPosts.filter((n) => n.status === "published");
  const [featured, ...rest] = publishedNews;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase mb-3">
            The Latest
          </span>
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-4">
            News & Insights
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Updates, stories, and announcements from our team
          </p>
        </div>

        {!publishedNews.length && (
          <div className="text-center py-24 text-gray-400">
            No news posts yet — check back soon.
          </div>
        )}

        {/* Featured post */}
        {featured && (
          <article className="group relative mb-16 rounded-3xl overflow-hidden bg-gray-900 shadow-xl">
            {featured.imageUrl && (
              <div className="absolute inset-0">
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
              </div>
            )}
            <div className="relative px-8 py-16 md:px-14 md:py-24 max-w-3xl">
              <div className="flex items-center gap-3 mb-4 text-sm">
                <span className="px-3 py-1 rounded-full bg-blue-500/90 text-white font-semibold uppercase tracking-wider text-xs">
                  {featured.category || "News"}
                </span>
                <span className="text-gray-300">{formatDate(featured.publishedAt)}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {featured.title}
              </h2>
              <p className="text-gray-200 line-clamp-2 mb-5 text-lg">
                {featured.body}
              </p>
              <div className="text-sm text-gray-300 font-medium">
                By {featured.authorName || "Admin"}
              </div>
            </div>
          </article>
        )}

        {/* Grid of remaining posts */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {post.imageUrl ? (
                <div className="overflow-hidden h-48">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                  <span className="text-blue-300 text-sm font-medium">No image</span>
                </div>
              )}

              <div className="flex-1 flex flex-col p-6">
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <span className="text-blue-600 font-semibold uppercase tracking-wider">
                    {post.category || "News"}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-400">{formatDate(post.publishedAt)}</span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>

                <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
                  {post.body}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400 font-medium">
                    By {post.authorName || "Admin"}
                  </span>
                  <span className="text-blue-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}