import { fetchGraphQL } from "@/lib/graphql";
import ImageCarousel from "../components/imageCarosel"; // Adjust this import path if needed

const GET_HOUSE_TYPES = `
  query {
    houseTypes {
      id
      name
      price
      bedrooms
      bathrooms
      images
      status
      berRating
    }
  }
`;

function berColor(rating) {
  if (!rating) return "bg-white/90 text-gray-700";
  const letter = rating.charAt(0).toUpperCase();
  if (["A"].includes(letter)) return "bg-green-500/90 text-white";
  if (["B", "C"].includes(letter)) return "bg-lime-500/90 text-white";
  if (["D", "E"].includes(letter)) return "bg-amber-500/90 text-white";
  return "bg-red-500/90 text-white";
}

export default async function HouseTypesPage() {
  const data = await fetchGraphQL(GET_HOUSE_TYPES);
  const publishedHouses = data.houseTypes.filter((h) => h.status === "published");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase mb-3">
            Now Available
          </span>
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Available Properties
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Browse our collection of exclusive homes built for modern living
          </p>
        </div>

        {!publishedHouses.length && (
          <div className="text-center py-24 text-gray-400">
            No properties published yet — check back soon.
          </div>
        )}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedHouses.map((house) => (
            <div
              key={house.id}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Carousel */}
              <div className="h-64 overflow-hidden relative bg-gray-200">
                <div className="w-full h-full group-hover:scale-105 transition-transform duration-500">
                  <ImageCarousel images={house.images} altText={house.name} />
                </div>

                {house.berRating && (
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full shadow backdrop-blur-sm pointer-events-none ${berColor(
                      house.berRating
                    )}`}
                  >
                    BER {house.berRating}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                  {house.name}
                </h2>

                <p className="text-blue-600 font-bold text-2xl mb-5">
                  {house.price ? `€${house.price.toLocaleString()}` : "Price on Request"}
                </p>

                <div className="mt-auto flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
                  <span className="inline-flex items-center gap-1.5">
                    🛏 <span className="font-medium text-gray-700">{house.bedrooms || 0}</span> Beds
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    🛁 <span className="font-medium text-gray-700">{house.bathrooms || 0}</span> Baths
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}