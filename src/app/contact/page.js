import { fetchGraphQL } from "@/lib/graphql";

const GET_CONTACT_CONTENT = `
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

export default async function ContactPage() {
  const data = await fetchGraphQL(GET_CONTACT_CONTENT);
  const contactData = data.pageContents.find((c) => c.sectionId === "contact");

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-24 border-b border-gray-100">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />

        <div className="relative container mx-auto px-6 text-center max-w-3xl">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase mb-4">
            Get In Touch
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
            {contactData?.sectionTitle || "Contact Us"}
          </h1>
          {contactData?.sectionSubtitle && (
            <p className="text-xl text-blue-600 font-medium mb-4">
              {contactData.sectionSubtitle}
            </p>
          )}
          {contactData?.sectionBody && (
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
              {contactData.sectionBody}
            </p>
          )}
        </div>
      </section>

      {/* Image */}
      {contactData?.imageUrl && (
        <section className="container mx-auto px-6 py-20 max-w-4xl">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl -z-10 rotate-1" />
            <img
              src={contactData.imageUrl}
              alt={contactData.sectionTitle || "Contact us"}
              className="rounded-2xl shadow-xl w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>
        </section>
      )}
    </div>
  );
}