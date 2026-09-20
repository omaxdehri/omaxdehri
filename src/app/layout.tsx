import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "ORTHO MAX MULTI SPECIALITY HOSPITAL | Dr. Kumar Anshuman | Orthopaedic surgeon | Dehri",
  description:
    "ORTHO MAX MULTI SPECIALITY HOSPITAL, Canal Road, Dehri-on-Sone (Rohtas) — Leading Orthopaedic, Joint Replacement, Fracture Trauma & Arthroscopy Centre led by Dr. Kumar Anshuman (20+ Years Surgical Experience). Specialized care for knee replacement, ACL reconstruction, arthritis (गठिया), sciatica (नस दबना) & physiotherapy.",
  keywords: [
    "ORTHO MAX MULTI SPECIALITY HOSPITAL",
    "Dr Kumar Anshuman",
    "Orthopaedic surgeon Dehri",
    "Orthopedic Doctor Consultation in Dehri-on-Sone",
    "Knee Replacement Surgery Dehri-on-Sone",
    "Joint Replacement Treatment Rohtas",
    "Fracture Treatment and Orthopedic Trauma Care",
    "Knee Arthroscopy and ACL Reconstruction",
    "PCL Reconstruction Surgery",
    "Orthopedic Second Opinion Dehri",
    "Knee Pain Treatment घुटने में दर्द",
    "Knee Arthritis Treatment गठिया",
    "Total Knee Replacement Surgery",
    "Hip Replacement Surgery Dehri",
    "Shoulder Arthroscopy Shoulder Pain कंधे में दर्द",
    "Sports Injury Treatment Ligament Reconstruction",
    "Arthritis Treatment जोड़ का दर्द",
    "Nerve Compression Evaluation नस दबना",
    "Physiotherapy Center Dehri",
    "Post-surgical rehabilitation Dehri",
    "Best Orthopedic Hospital in Rohtas Bihar",
  ],
  authors: [{ name: "Dr. Kumar Anshuman" }],
  creator: "ORTHO MAX MULTI SPECIALITY HOSPITAL",
  publisher: "ORTHO MAX MULTI SPECIALITY HOSPITAL",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "ORTHO MAX MULTI SPECIALITY HOSPITAL | Dr. Kumar Anshuman | Orthopaedic surgeon | Dehri",
    description:
      "Advanced orthopaedic care, total knee & hip joint replacement, arthroscopy, trauma surgery, and physiotherapy by Dr. Kumar Anshuman (20+ Years Experience) at Canal Road, Dehri-on-Sone, Bihar 821307.",
    type: "website",
    locale: "en_IN",
    siteName: "ORTHO MAX MULTI SPECIALITY HOSPITAL",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORTHO MAX MULTI SPECIALITY HOSPITAL | Dr. Kumar Anshuman | Orthopaedic surgeon | Dehri",
    description: "Premier Multi Speciality & Orthopaedic Hospital in Canal Road, Dehri, Rohtas, Bihar 821307. Led by Dr. Kumar Anshuman with 20+ Years Experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Hospital", "MedicalBusiness", "MedicalClinic"],
              name: "ORTHO MAX MULTI SPECIALITY HOSPITAL",
              alternateName: "Orthomax Hospital Dehri",
              description:
                "Premier super-specialty orthopaedic hospital and trauma care center in Dehri-on-Sone, Rohtas led by Dr. Kumar Anshuman, Senior Orthopaedic & Joint Replacement Surgeon with 20+ years of surgical experience.",
              telephone: "+919467029173",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Chuna Bhatta, Canal Road, Jakhi Bigha",
                addressLocality: "Dehri",
                addressRegion: "Rohtas, Bihar",
                postalCode: "821307",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 24.9160041,
                longitude: 84.1809366,
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.4",
                reviewCount: "10",
                bestRating: "5",
                worstRating: "1",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  opens: "09:30",
                  closes: "13:30",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  opens: "15:30",
                  closes: "18:00",
                },
              ],
              physician: {
                "@type": "Physician",
                name: "Dr. Kumar Anshuman",
                jobTitle: "Orthopaedic Surgeon",
                description: "Senior Orthopaedic & Joint Replacement Surgeon with 20+ years of surgical experience.",
                medicalSpecialty: [
                  "Orthopaedic Surgery",
                  "Joint Replacement",
                  "Arthroscopy",
                  "Sports Injury",
                  "Trauma Surgery",
                ],
              },
              areaServed: [
                "Dehri-on-Sone",
                "Sasaram",
                "Aurangabad",
                "Rohtas",
                "Dalmianagar",
                "Bhabua",
                "Bikramganj",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${plusJakarta.variable} antialiased bg-slate-950 text-slate-100 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
