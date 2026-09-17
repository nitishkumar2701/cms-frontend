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

export default async function NewsPage() {
  const data = await fetchGraphQL(GET_NEWS);
  const publishedNews = data.newsPosts.filter(n => n.status === "published");

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-10 border-b pb-4">Latest News & Insights</h1>
      
      <div className="space-y-12">
        {publishedNews.map((post) => (
          <article key={post.id} className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-2xl shadow-sm border">
            {post.imageUrl && (
              <img src={post.imageUrl} alt={post.title} className="w-full md:w-72 h-48 object-cover rounded-xl" />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 text-sm">
                <span className="text-blue-600 font-semibold uppercase tracking-wider">{post.category || "News"}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Recent"}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-3">{post.title}</h2>
              <p className="text-gray-600 line-clamp-3 mb-4">{post.body}</p>
              <div className="text-sm text-gray-500 font-medium">
                By {post.authorName || "Admin"}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}