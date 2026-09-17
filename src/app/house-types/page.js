import { fetchGraphQL } from "@/lib/graphql";

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

export default async function HouseTypesPage() {
  const data = await fetchGraphQL(GET_HOUSE_TYPES);
  const publishedHouses = data.houseTypes.filter(h => h.status === "published");

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Available Properties</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Browse our collection of exclusive homes built for modern living.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {publishedHouses.map((house) => (
          <div key={house.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow border overflow-hidden flex flex-col">
            <div className="h-64 overflow-hidden relative bg-gray-200">
              {house.images?.[0] ? (
                <img src={house.images[0]} alt={house.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
              )}
              {house.berRating && (
                <span className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-sm font-bold rounded-full shadow">
                  BER: {house.berRating}
                </span>
              )}
            </div>
            
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">{house.name}</h2>
                <p className="text-blue-600 font-bold text-xl mb-4">
                  {house.price ? `€${house.price.toLocaleString()}` : "Price on Request"}
                </p>
              </div>
              <div className="flex justify-between items-center text-gray-500 text-sm border-t pt-4 mt-4">
                <span>🛏 {house.bedrooms || 0} Beds</span>
                <span>🛁 {house.bathrooms || 0} Baths</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}