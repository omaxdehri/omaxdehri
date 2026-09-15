import Image from "next/image";
import {
  Bone, Siren, Scan, Hand, PersonStanding, HeartPulse,
  Phone, MapPin, Clock, ArrowUpRight, ShieldCheck, Stethoscope, Star,
  CheckCircle2, Activity, FileCheck2, Quote
} from "lucide-react";
import { Sora, IBM_Plex_Sans, IBM_Plex_Mono, IBM_Plex_Sans_Devanagari } from "next/font/google";
import InfrastructureSection from "./components/InfrastructureSection";
import PatientFirstSection from "./components/PatientFirstSection";
import HeroCarousel from "./components/HeroCarousel";
import OurDepartmentsSection from "./components/OurDepartmentsSection";
import Navbar from "./components/Navbar";

/* ---------- Fonts (Optimized with display: swap for instant rendering) ---------- */
const display = Sora({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });
const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-mono", display: "swap" });
const dev = IBM_Plex_Sans_Devanagari({ subsets: ["devanagari"], weight: ["500", "600"], variable: "--font-dev", display: "swap" });

/* =========================================================================================
   IMAGES — Real hospital photography and assets from /public
   ========================================================================================= */
const IMG = {
  logo: "/hospital_logo__orthomax_hospital_orthopedic_surgeon_dehri.png",
  front: "/front_image_orthomax_hospital_orthopedic_surgeon_dehri.png",
  frontOld: "/hospitalfront_orthomax_hospital_orthopedic_surgeon.jpeg",
  doctor: "/Dr._Kumar_Anshuman_mbbs_orthomax_hospital_orthopedic_surgeon_dehri.jpeg",
  reception: "/reception_counter_orthomax_hospital_orthopedic_surgeon_dehri.jpeg",
  icu: "/Icu_orthomax_top_orthopedic_surgeon.jpeg",
  xray: "/advanced_xray_orthomax_hospital_orthopedic_surgeon_dehri.jpeg",
  diagnostic: "/diagnostic_center_orthomax_hospital_orthopedic_surgeon_dehri.jpeg",
  femaleWard: "/female_ward_orthomax_hospital_orthopedic_surgeon.jpeg",
  generalWard: "/general_ward_orthomax_hospital_orthopedic_surgeon_dehri.jpeg",
  pathology: "/modern_pathology__orthomax_hospital_orthopedic_surgeon.jpeg",
  ot1: "/operationtheater_orthomax_hospital_orthopedic_surgeon.jpeg",
  ot2: "/operation_theater_2_orthomax_hospital_best_orthopedic_surgeon_dehri.jpeg",
  oxygen: "/oxygen_cylinder_facility_orthomax_hospital_orthopedic_surgeon.jpeg",
  waiting1: "/patient_waiting_area_orthomax_hospital_orthopedic_surgeon.jpeg",
  waiting2: "/patient_waiting_area2_orthomax_hospital_orthopedic_surgeon.jpeg",
  pharmacy1: "/pharmacy1_orthomax_hospital_orthopedic_surgeon.jpeg",
  pharmacy2: "/pharmacy2_orthomax_hospital_orthopedic_surgeon.jpeg",
  physio: "/physiotherapy_center_orthomax_hospital_orthopedic_surgeon_dehri.jpeg",
  elevator: "/safe_lift_elevator_facility_orthomax_hospital_orthopedic_surgeon_dehri.jpeg",
  specialWard: "/specialward__orthomax_hospital_orthopedic_surgeon.jpeg",
  investigation: "/patient_investigation_room_orthomax_hospital_best_orthopedic_surgeon_dehri.jpeg",
};

const PHONE = "9467029173";
const ADDRESS = "Chuna Bhatta, Canal Road, Jakhi Bigha, Dehri, Rohtas, Bihar 821307";
const MAPS_DIRECTIONS =
  "https://www.google.com/maps/dir//(ORTHO+MAX+HOSPITAL)Dr.+Kumar+Anshuman+MBBS,+DNB+ORTHO,+M.ch+ORTHO+Orthopedic,+Arthroscopy,+Joint+Replacement+Centre,+Chuna+Bhatta,+Canal+Rd,+Jakhi+Bigha,+Dehri,+Bihar+821307,+India/@24.9160041,84.1783617,17z";
const LAT = 24.9160041, LNG = 84.1809366;

export const metadata = {
  title: "ORTHO MAX MULTI SPECIALITY HOSPITAL | Dr. Kumar Anshuman | Orthopaedic surgeon | Dehri",
  description:
    "ORTHO MAX MULTI SPECIALITY HOSPITAL on Canal Road, Dehri (Rohtas) — comprehensive care by Dr. Kumar Anshuman (MBBS, DNB (Ortho), New Delhi, M.Ch (Ortho), MS (HCM) London) for knee & joint replacement, fracture trauma care, knee & shoulder arthroscopy (ACL/PCL reconstruction), arthritis (गठिया / घुटने में दर्द), spine & sciatica (नस दबना), and post-surgical physiotherapy.",
  keywords: [
    "ORTHO MAX MULTI SPECIALITY HOSPITAL", "Dr Kumar Anshuman", "Orthopaedic surgeon Dehri",
    "Orthopedic Doctor Consultation in Dehri-on-Sone", "Knee Replacement Surgery Dehri-on-Sone",
    "Joint Replacement Treatment Rohtas", "Fracture Treatment and Orthopedic Trauma Care",
    "Knee Arthroscopy and ACL Reconstruction", "PCL Reconstruction Surgery",
    "Orthopedic Second Opinion Dehri", "Knee Pain Treatment घुटने में दर्द",
    "Knee Arthritis Treatment गठिया", "Total Knee Replacement Surgery",
    "Hip Replacement Surgery Dehri", "Shoulder Arthroscopy Shoulder Pain कंधे में दर्द",
    "Sports Injury Treatment Ligament Reconstruction", "Arthritis Treatment जोड़ का दर्द",
    "Nerve Compression Evaluation नस दबना", "Physiotherapy Center Dehri",
    "Post-surgical rehabilitation Dehri", "Best Orthopedic Hospital in Rohtas Bihar",
  ],
  openGraph: {
    title: "ORTHO MAX MULTI SPECIALITY HOSPITAL — Dr. Kumar Anshuman | Orthopaedic surgeon | Dehri",
    description: "Joint replacement, fracture & trauma, arthroscopy, spine and multi-speciality care for Dehri, Sasaram, Aurangabad and the Sone region.",
    images: [IMG.front],
    locale: "en_IN",
    type: "website",
  },
  alternates: { canonical: "https://www.orthomaxhospital.in" },
};

/* ---------- Data ---------- */
const services = [
  {
    icon: Bone,
    title: "Knee & Joint Replacement Surgery",
    tag: "TKR & Hip Replacement",
    text: "Total Knee Replacement (TKR), partial knee replacement, and hip replacement surgery for severe arthritis (गठिया), persistent joint pain, and advanced cartilage damage."
  },
  {
    icon: Scan,
    title: "Knee Arthroscopy & ACL / PCL Reconstruction",
    tag: "Keyhole Ligament Surgery",
    text: "Minimally invasive keyhole arthroscopic surgery for ACL tear, PCL tear, meniscus cartilage injuries, and sports-related knee ligament reconstruction."
  },
  {
    icon: Siren,
    title: "Fracture Surgery & Orthopedic Trauma Care",
    tag: "Emergency Trauma & Fixation",
    text: "Immediate surgical fixation for broken bones (चोट), complex accident fractures, neglected non-unions, pelvic trauma, and pediatric bone injuries."
  },
  {
    icon: Hand,
    title: "Shoulder Arthroscopy & Upper Limb Care",
    tag: "Rotator Cuff & Shoulder Pain",
    text: "Specialized treatment for shoulder injuries, rotator cuff tears, frozen shoulder (कंधे में दर्द & stiffness), recurrent dislocations, and tennis elbow."
  },
  {
    icon: PersonStanding,
    title: "Spine Care & Nerve Evaluation",
    tag: "Sciatica & नस दबना",
    text: "Expert diagnosis and non-surgical/surgical treatment for lumbar disc slip, sciatica, cervical spondylosis, back pain, and nerve compression (नस दबना)."
  },
  {
    icon: HeartPulse,
    title: "Arthritis & Chronic Joint Pain Treatment",
    tag: "गठिया & जोड़ का दर्द",
    text: "Comprehensive medical management for osteoarthritis, intra-articular joint injections, osteoporosis therapy, stiffness relief, and mobility restoration."
  },
  {
    icon: Activity,
    title: "Physiotherapy & Post-Surgical Rehabilitation",
    tag: "Mobility Recovery",
    text: "Dedicated on-site physical therapy and electrotherapy for back pain, neck pain, ligament healing, and recovery after fracture and knee replacement surgery."
  },
  {
    icon: FileCheck2,
    title: "Orthopedic Second Opinion & Follow-Up",
    tag: "Expert Case Review",
    text: "Comprehensive surgical second opinions for joint replacement, complex fractures, and persistent joint problems with continuous follow-up care."
  },
];

const conditions = [
  {
    region: "Knee & Lower Limb",
    items: [
      "Knee Osteoarthritis & Severe Arthritis (गठिया)",
      "Knee Pain, Swelling & Difficulty Walking (घुटने में दर्द)",
      "ACL & PCL Ligament Tears (Cruciate Ligament Injuries)",
      "Meniscus Cartilage Tears & Joint Locking",
      "Patellar Maltracking & Lower Limb Deformities",
    ],
  },
  {
    region: "Shoulder & Upper Limb",
    items: [
      "Frozen Shoulder & Adhesive Capsulitis (कंधे में दर्द)",
      "Rotator Cuff Tendon Tears & Impingement",
      "Recurrent Shoulder Dislocations & Labral Tears",
      "Tennis Elbow & Golfer's Elbow Tendinitis",
      "Wrist Fractures & Hand Tendon Injuries",
    ],
  },
  {
    region: "Spine, Neck & Nerve Care",
    items: [
      "Nerve Compression & Pinched Nerves (नस दबना)",
      "Sciatica Pain, Tingling & Leg Numbness (झनझनाहट)",
      "Lumbar Disc Herniation & Slipped Disc",
      "Cervical Spondylosis & Neck Stiffness",
      "Chronic Lower Back Pain & Postural Strain",
    ],
  },
  {
    region: "Fractures & Musculoskeletal Trauma",
    items: [
      "Road Traffic Accident Trauma & Broken Bones (चोट)",
      "Compound Open Fractures & Polytrauma",
      "Old, Neglected & Malunited Fractures (हड्डी का गलत जुड़ना)",
      "Geriatric Hip & Fragility Fractures",
      "Pediatric Bone Fractures & Growth Plate Injuries",
    ],
  },
  {
    region: "Hip & Joint Degeneration",
    items: [
      "Hip Joint Osteoarthritis & Persistent Hip Pain",
      "Avascular Necrosis (AVN) of the Femoral Head",
      "Degenerative Joint Damage & Cartilage Wear",
      "Pelvic & Acetabular Complex Fractures",
      "Inflammatory Joint Arthritis & Morning Stiffness",
    ],
  },
  {
    region: "Physiotherapy & Sports Rehabilitation",
    items: [
      "Post-Surgical Rehab after Knee & Hip Replacement",
      "Physiotherapy for Ligament, Muscle & Shoulder Injuries",
      "Back Pain & Neck Pain Electrotherapy Rehabilitation",
      "Recovery & Mobilization After Fracture Fixation",
      "Targeted Exercise Therapy for Joint Flexibility & Strength",
    ],
  },
];

const journey = [
  { title: "Clinical Consultation & Second Opinion", text: "Dr. Kumar Anshuman reviews detailed medical history, joint mobility, digital X-rays, and previous reports." },
  { title: "In-House Digital X-Ray & Diagnostics", text: "Immediate low-radiation digital X-rays, pre-op blood investigations, and pathology tests conducted on premises." },
  { title: "Personalized Treatment Planning", text: "Transparent care pathway tailored to your age, mobility goals, and clinical needs — non-surgical or surgical." },
  { title: "Advanced Modular Surgical Suites", text: "State-of-the-art sterile modular OT with laminar airflow, HEPA filtration, and ICU backup for joint replacement & trauma." },
  { title: "Supervised Physiotherapy & Recovery", text: "Structured in-hospital physical therapy and guided exercise protocols to ensure quick, confident return to daily activities." },
];

const facilities = [
  { img: IMG.frontOld, label: "ORTHO MAX MULTI SPECIALITY HOSPITAL — Canal Road, Dehri", desc: "State-of-the-art orthopaedic & multi-speciality hospital exterior" },
  { img: IMG.reception, label: "Reception & Emergency Help Desk", desc: "Front desk for quick registration, triage & ambulance assistance" },
  {
    img: IMG.ot1,
    label: "Modular Operation Theatre Suites",
    desc: "Sterile laminar airflow surgical suites equipped with C-arm fluoroscopy for joint replacement & trauma surgeries",
    gallery: [
      IMG.ot1,
      IMG.ot2,
      "/ongoing_operation_orthomax_hospital_orthopedic_surgeon_rohtas.webp",
    ],
  },
  { img: IMG.icu, label: "ICU & Critical Care", desc: "Monitored beds with emergency ventilator support" },
  { img: IMG.xray, label: "Advanced Digital X-Ray", desc: "Instant low-radiation bone imaging" },
  { img: IMG.diagnostic, label: "Diagnostic Centre", desc: "Comprehensive pre-operative evaluations" },
  { img: IMG.physio, label: "Physiotherapy Centre", desc: "Dedicated rehab unit with modern electrotherapy" },
  { img: IMG.pathology, label: "In-House Pathology Lab", desc: "Fast-track blood and joint fluid analysis" },
  { img: IMG.specialWard, label: "Special & Private Ward", desc: "Comfortable recovery rooms for post-op patients" },
  { img: IMG.femaleWard, label: "Female Patient Ward", desc: "Dedicated safe ward with female nursing care" },
  { img: IMG.generalWard, label: "General Patient Ward", desc: "Clean, well-ventilated recovery wards" },
  { img: IMG.pharmacy1, label: "In-House Pharmacy", desc: "All orthopedic medicines, braces & surgical consumables" },
  { img: IMG.investigation, label: "Patient Examination Room", desc: "Equipped for clinical check-ups, plastering & dressings" },
  { img: IMG.elevator, label: "Bed & Stretcher Lift", desc: "Smooth elevator facility for post-op & elderly patients" },
];

const stats = [
  { n: "Immediate", l: "Emergency Trauma Care" },
  { n: "100%", l: "In-House Diagnostic Setup" },
  { n: "15+", l: "Years Surgical Experience" },
  { n: "5000+", l: "Patients Treated & Recovered" },
];

const faqs = [
  {
    q: "What treatments are available for severe knee pain and arthritis (घुटने में दर्द / गठिया)?",
    a: "At ORTHO MAX MULTI SPECIALITY HOSPITAL, Dr. Kumar Anshuman offers complete care ranging from conservative therapies (intra-articular injections, targeted physiotherapy, osteoporosis treatment) to advanced Total Knee Replacement (TKR) and partial joint replacement for lasting pain relief and mobility.",
  },
  {
    q: "How is ACL and PCL ligament reconstruction surgery performed for sports knee injuries?",
    a: "Ligament reconstructions (ACL, PCL, and multi-ligament injuries) are performed using minimally invasive keyhole arthroscopic surgery. This allows precise anatomical graft placement with smaller incisions, minimal blood loss, and faster return to active sports and daily mobility.",
  },
  {
    q: "Can I get an orthopedic second opinion for fractures, knee problems, or surgery in Dehri-on-Sone?",
    a: "Yes. Dr. Kumar Anshuman provides thorough clinical second opinions for complex bone fractures, joint replacement candidates, failed previous surgeries, and non-union cases to help patients make well-informed treatment decisions.",
  },
  {
    q: "What emergency trauma care is available for broken bones and accident injuries (चोट)?",
    a: "Walk-ins are welcomed immediately at our Emergency Help Desk. The hospital is equipped with on-site digital X-ray, pre-op diagnostics, sterile modular operation theatres, and trauma surgical readiness for urgent fracture reduction and fixation.",
  },
  {
    q: "How is nerve compression (नस दबना), sciatica, and chronic back pain evaluated and treated?",
    a: "We perform comprehensive musculoskeletal and nerve evaluations for symptoms such as back pain, sciatica, tingling, and numbness. Treatment combines structured clinical management, postural rehabilitation, dedicated physiotherapy, and selective spinal interventions when indicated.",
  },
  {
    q: "Is specialized physiotherapy and rehabilitation available after surgery on-site?",
    a: "Yes. Our on-site Physiotherapy & Rehabilitation Centre features modern electrotherapy and supervised exercise programs for post-fracture recovery, joint replacement rehabilitation, and sports injury recovery.",
  },
  {
    q: "Do I need a prior appointment before visiting ORTHO MAX MULTI SPECIALITY HOSPITAL?",
    a: `Emergency trauma and acute pain patients can walk in directly at any time (24/7). For scheduled OPD consultations (9:30 AM – 1:30 PM & 3:30 PM – 6:00 PM) with Dr. Kumar Anshuman | Orthopaedic surgeon | Dehri, calling +91 ${PHONE} in advance ensures convenient slot booking and minimal waiting time.`,
  },
  {
    q: "Where is ORTHO MAX MULTI SPECIALITY HOSPITAL located in Dehri-on-Sone?",
    a: "We are located at Chuna Bhatta, Canal Road, Jakhi Bigha, Dehri-on-Sone, Rohtas, Bihar 821307 — easily accessible for patients coming from Dehri, Sasaram, Dalmianagar, Aurangabad, and neighboring districts.",
  },
];

export default function Home() {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} ${dev.variable} font-[family-name:var(--font-body)] text-[#062226] bg-[#F6FBFD]`}>
      <style>{`
        @keyframes floatSlow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .float-slow{animation:floatSlow 6s ease-in-out infinite}
        details[open] summary .chev{transform:rotate(180deg)}
        @media (prefers-reduced-motion: reduce){ .float-slow{animation:none} }
      `}</style>

      {/* JSON-LD Structured Data Schema for Rich Google Snippets */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["Hospital", "MedicalClinic", "MedicalBusiness"],
          name: "ORTHO MAX MULTI SPECIALITY HOSPITAL",
          alternateName: "Orthomax Hospital",
          image: `https://www.orthomaxhospital.in${IMG.front}`,
          telephone: `+91${PHONE}`,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Chuna Bhatta, Canal Road, Jakhi Bigha",
            addressLocality: "Dehri-on-Sone",
            addressRegion: "Bihar",
            postalCode: "821307",
            addressCountry: "IN"
          },
          geo: { "@type": "GeoCoordinates", latitude: LAT, longitude: LNG },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.4",
            reviewCount: "10",
            bestRating: "5"
          },
          medicalSpecialty: [
            "Orthopedic Surgery",
            "Joint Replacement",
            "Arthroscopy",
            "Trauma Surgery",
            "Physiotherapy",
            "Sports Medicine"
          ],
          areaServed: [
            "Dehri-on-Sone", "Sasaram", "Aurangabad", "Rohtas", "Dalmianagar", "Bhabua", "Bikramganj"
          ],
          founder: {
            "@type": "Physician",
            name: "Dr. Kumar Anshuman",
            jobTitle: "Orthopaedic surgeon",
            medicalSpecialty: "Orthopaedic Surgery, Arthroscopy, Joint Replacement"
          },
        })
      }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        })
      }} />

      {/* ---------- Header / Navigation ---------- */}
      <Navbar phone={PHONE} logo={IMG.logo} />

      {/* ---------- Emergency Notice Strip ---------- */}
      <div className="bg-[#005F6B] text-white text-sm">
        <div className="max-w-6xl mx-auto px-5 py-2.5 flex items-center justify-center gap-2 text-center">
          <Siren size={16} className="text-[#A2DFF7] shrink-0 animate-pulse" />
          <span>
            Emergency &amp; Trauma Support: Call <a href={`tel:${PHONE}`} className="underline font-semibold tracking-wide ml-1">{PHONE}</a>
          </span>
        </div>
      </div>

      {/* ---------- Hero Section (Carousel First) ---------- */}
      <section className="relative bg-[#031B1E] text-white">
        {/* 1. Carousel FIRST right after topnav & emergency notice strip */}
        <HeroCarousel phone={PHONE} />

        {/* 2. Hero Headline, Lead Surgeon & Key Metrics */}
        <div className="relative border-t border-[#A2DFF7]/15 bg-gradient-to-b from-[#031B1E] via-[#062226] to-[#0A3A40]">
          <div className="max-w-6xl mx-auto px-5 py-10 lg:py-14">
            <div className="grid lg:grid-cols-[1.35fr_1fr] gap-8 lg:gap-12 items-center">
              {/* Left Column: Hospital Overview & CTAs */}
              <div>
                {/* Location Badge Strip */}
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#A2DFF7]/30 text-[#A2DFF7] text-xs font-semibold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#3A9AD9] animate-ping shrink-0" />
                    Canal Road, Dehri · Rohtas, Bihar
                  </div>
                </div>

                {/* Headline */}
                <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.2] text-white drop-shadow">
                  ORTHO MAX MULTI SPECIALITY HOSPITAL
                </h1>

                {/* Hindi Tagline */}
                <p className="font-[family-name:var(--font-dev)] text-base sm:text-lg text-[#A2DFF7] font-semibold mt-2.5">
                  आपके हर कदम को फिर से आसान बनाने का भरोसा !
                </p>

                {/* Body Text with integrated keywords */}
                <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-white/85 max-w-2xl">
                  Super-specialty knee &amp; hip joint replacement, arthroscopy, sports injury recovery and acute trauma care led by
                  <strong className="text-[#A2DFF7] font-semibold"> Dr. Kumar Anshuman | Orthopaedic surgeon | Dehri</strong> (MBBS, DNB (Ortho), New Delhi, M.Ch (Ortho), MS (HCM) London) — equipped with in-house modular OT, ICU, digital X-ray, and physiotherapy.
                </p>

                {/* CTA Buttons */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={`tel:${PHONE}`}
                    className="bg-[#007B8A] hover:bg-[#005F6B] text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 active:scale-95 transition-all shadow-lg text-sm"
                  >
                    <Phone size={16} /> Call OPD / Emergency: {PHONE}
                  </a>
                  <a
                    href="#doctor"
                    className="border border-[#A2DFF7]/40 text-[#A2DFF7] hover:text-white hover:bg-white/10 px-5 py-3 rounded-full font-semibold active:scale-95 transition-all text-sm"
                  >
                    Dr. Kumar Anshuman Profile
                  </a>
                  <a
                    href="#facilities"
                    className="text-white/80 hover:text-[#A2DFF7] px-3 py-3 text-sm font-medium transition-colors flex items-center gap-1.5"
                  >
                    Hospital Facilities <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>

              {/* Right Column: Doctor Credential Highlight Card */}
              <div className="bg-white/5 border border-[#A2DFF7]/25 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-xl flex flex-col justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#A2DFF7] shrink-0 bg-slate-800 shadow-md">
                    <Image
                      src={IMG.doctor}
                      alt="Dr. Kumar Anshuman | Orthopaedic surgeon | Dehri"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#A2DFF7] uppercase tracking-wider bg-[#007B8A]/30 px-2 py-0.5 rounded-md mb-1 border border-[#A2DFF7]/20">
                      <Stethoscope size={12} /> Lead Orthopaedic Surgeon
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold text-white leading-snug">
                      Dr. Kumar Anshuman
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A2DFF7] font-semibold mt-0.5">
                      Orthopaedic surgeon | Dehri
                    </p>
                    <p className="text-xs text-white/70 mt-1 leading-snug">
                      MBBS · DNB (Ortho), New Delhi · M.Ch (Ortho) · MS (HCM) London · Specialist in Joint Replacement &amp; Trauma
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/80">
                  <span className="flex items-center gap-1.5 text-[#A2DFF7]">
                    <ShieldCheck size={15} /> Verified Orthopaedic Specialist
                  </span>
                  <a href={`tel:${PHONE}`} className="font-semibold text-white hover:text-[#A2DFF7] underline underline-offset-2">
                    Book OPD Slot →
                  </a>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-black/40 border border-[#A2DFF7]/20 backdrop-blur-md">
              {stats.map((s) => (
                <div key={s.l} className="text-center sm:text-left px-2">
                  <p className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-[#A2DFF7]">{s.n}</p>
                  <p className="text-[11px] sm:text-xs text-white/75 mt-0.5 font-medium leading-tight">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 3. Our Specialities (Angled Split Design) ---------- */}
      <OurDepartmentsSection />

      {/* ---------- Doctor Profile ---------- */}
      <section id="doctor" className="bg-white border-y border-[#A2DFF7]">
        <div className="max-w-6xl mx-auto px-5 py-16 grid md:grid-cols-[300px_1fr] gap-10 items-start">
          <div className="rounded-2xl overflow-hidden border-2 border-[#A2DFF7] shadow-md bg-slate-50">
            <Image
              src={IMG.doctor}
              alt="Dr. Kumar Anshuman | Orthopaedic surgeon | Dehri at ORTHO MAX MULTI SPECIALITY HOSPITAL"
              width={400}
              height={480}
              loading="lazy"
              quality={80}
              sizes="(max-width: 768px) 100vw, 300px"
              className="w-full h-80 object-cover object-top"
            />
            <div className="p-4 bg-[#F6FBFD] border-t border-[#A2DFF7]/60 text-center">
              <p className="font-bold text-[#005F6B] text-base">Dr. Kumar Anshuman</p>
              <p className="text-xs text-[#007B8A] font-semibold mt-0.5">Orthopaedic surgeon | Dehri</p>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007B8A]/10 text-[#007B8A] text-xs font-semibold uppercase tracking-wider mb-2">
              <Stethoscope size={14} /> Lead Orthopaedic Surgeon
            </div>

            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#062226]">
              Dr. Kumar Anshuman
            </h2>
            <p className="text-[#007B8A] font-bold text-sm sm:text-base mt-1">
              Dr. Kumar Anshuman | Orthopaedic surgeon | Dehri
            </p>
            <p className="text-xs text-[#0A3A40]/75 font-semibold mt-0.5">
              MBBS, DNB (Ortho), New Delhi · M.Ch (Ortho) · MS (HCM) London
            </p>

            <p className="mt-4 text-[#0A3A40] leading-relaxed">
              Dr. Kumar Anshuman established <strong>ORTHO MAX MULTI SPECIALITY HOSPITAL</strong> on Canal Road to bring modern, super-specialty joint replacement and orthopaedic trauma surgery to Dehri-on-Sone, Sasaram, Aurangabad, and the entire Rohtas region.
            </p>
            <p className="mt-3 text-[#0A3A40] leading-relaxed">
              With dedicated training in complex trauma, arthroscopic ligament reconstruction (ACL / PCL), and knee &amp; hip replacement, patients receive complete care — from initial clinical diagnosis and digital X-ray imaging to surgery, second opinions, and complete mobility rehabilitation under one roof without needing to travel to Patna or Varanasi.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
              {[
                "Knee & Hip Joint Replacement (TKR)",
                "Emergency Trauma & Accident Fractures",
                "Knee Arthroscopy & ACL / PCL Reconstruction",
                "Spine Care, Sciatica & नस दबना Evaluation",
                "Shoulder Arthroscopy & Rotator Cuff Repair",
                "Geriatric Fracture Care & Osteoporosis Therapy",
                "On-Site Physiotherapy & Post-Surgical Rehab",
                "Orthopedic Second Opinions for Surgery",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2 text-[#0A3A40]">
                  <CheckCircle2 size={16} className="text-[#007B8A] shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 bg-[#007B8A] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#005F6B] transition-colors">
                <Phone size={15} /> Book Appointment
              </a>
              <div className="text-xs text-[#0A3A40]/80">
                <p><strong className="text-[#005F6B]">OPD Timings:</strong> 9:30 AM – 1:30 PM &amp; 3:30 PM – 6:00 PM</p>
                <p className="text-[#007B8A] font-medium">Emergency &amp; Trauma Care: Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Services (Google Business Profile Services Integrated) ---------- */}
      <section id="services" className="max-w-6xl mx-auto px-5 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#007B8A] bg-[#007B8A]/10 px-3 py-1 rounded-full">
            Clinical Specialties &amp; Treatments
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#062226] mt-3">
            Comprehensive Orthopaedic Care in Dehri-on-Sone
          </h2>
          <p className="text-sm sm:text-base text-[#0A3A40]/80 mt-2">
            State-of-the-art operative and non-operative orthopaedic solutions for long-term pain relief and full mobility.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, title, tag, text }) => (
            <div key={title} className="bg-white rounded-2xl p-5 border border-[#A2DFF7] hover:border-[#3A9AD9] hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#007B8A]/10 flex items-center justify-center text-[#007B8A] group-hover:bg-[#007B8A] group-hover:text-white transition-colors">
                    <Icon size={22} />
                  </div>
                  <span className="text-[10px] font-bold text-[#007B8A] bg-[#007B8A]/10 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-base mt-3.5 text-[#062226] leading-snug">
                  {title}
                </h3>
                <p className="text-xs text-[#0A3A40]/80 mt-2 leading-relaxed">
                  {text}
                </p>
              </div>
              <a href={`tel:${PHONE}`} className="mt-4 pt-3 border-t border-slate-100 inline-flex items-center gap-1.5 text-xs font-semibold text-[#007B8A] hover:text-[#005F6B]">
                Inquire for treatment <ArrowUpRight size={13} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Conditions Treated (Bilingual & Regional Keywords) ---------- */}
      <section id="conditions" className="bg-white border-y border-[#A2DFF7]">
        <div className="max-w-6xl mx-auto px-5 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#007B8A] bg-[#007B8A]/10 px-3 py-1 rounded-full">
              Symptoms &amp; Conditions Treated
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#062226] mt-3">
              Conditions We Frequently Diagnose &amp; Treat
            </h2>
            <p className="text-sm sm:text-base text-[#0A3A40]/80 mt-2">
              Identify your symptoms to see our specialized non-surgical, arthroscopic, and surgical solutions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditions.map((c) => (
              <div key={c.region} className="bg-[#F6FBFD] rounded-2xl p-6 border border-[#A2DFF7]">
                <h3 className="font-[family-name:var(--font-display)] font-bold text-base text-[#005F6B] border-b border-[#A2DFF7] pb-2.5">
                  {c.region}
                </h3>
                <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-[#0A3A40]/90">
                  {c.items.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#3A9AD9] font-bold shrink-0 mt-0.5">•</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Care Pathway / Patient Journey ---------- */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#007B8A] bg-[#007B8A]/10 px-3 py-1 rounded-full">
            Patient Pathway
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#062226] mt-3">
            From First Consultation to Full Mobility
          </h2>
          <p className="text-sm sm:text-base text-[#0A3A40]/80 mt-2">
            A structured, transparent care process designed for quick healing, comfort, and verified clinical outcomes.
          </p>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {journey.map((j, i) => (
            <li key={j.title} className="bg-white p-5 rounded-2xl border border-[#A2DFF7] shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-[family-name:var(--font-mono)] text-[#3A9AD9] font-bold text-sm bg-[#A2DFF7]/20 px-2.5 py-1 rounded-md inline-block">
                  Step 0{i + 1}
                </span>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-sm sm:text-base text-[#062226] mt-3 leading-snug">
                  {j.title}
                </h3>
                <p className="text-xs text-[#0A3A40]/80 mt-2 leading-relaxed">
                  {j.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- Facilities Section (Hospital Infrastructure) ---------- */}
      <InfrastructureSection facilities={facilities} />

      {/* ---------- Why Orthomax (Patient First Approach) ---------- */}
      <PatientFirstSection waitingImage={IMG.waiting1} />

      {/* ---------- Google Reviews & Trust CTA ---------- */}
      <section id="reviews" className="bg-[#A2DFF7]/20 border-y border-[#A2DFF7]">
        <div className="max-w-6xl mx-auto px-5 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <span className="font-bold text-[#062226] text-sm">4.4 / 5.0 Rating</span>
                <span className="text-xs text-[#0A3A40]/70 font-medium">(10+ Google Reviews)</span>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[#062226]">
                Trusted Orthopaedic &amp; Joint Replacement Care in Rohtas
              </h2>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <div className="bg-white/80 p-3.5 rounded-xl border border-[#A2DFF7]/60 text-xs text-[#0A3A40] flex items-start gap-2 shadow-sm">
                  <Quote size={16} className="text-[#007B8A] shrink-0 mt-0.5" />
                  <p>
                    <em>&ldquo;Thanks for your service, had pain in the knee but now completely recovered.&rdquo;</em>
                  </p>
                </div>
                <div className="bg-white/80 p-3.5 rounded-xl border border-[#A2DFF7]/60 text-xs text-[#0A3A40] flex items-start gap-2 shadow-sm">
                  <Quote size={16} className="text-[#007B8A] shrink-0 mt-0.5" />
                  <p>
                    <em>&ldquo;Best Doctor and hospital in my District (ROHTAS).&rdquo;</em>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href={MAPS_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#007B8A] hover:bg-[#005F6B] text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all shadow-md text-sm"
              >
                Find on Google Maps <ArrowUpRight size={16} />
              </a>
              <a
                href={`tel:${PHONE}`}
                className="bg-white text-[#005F6B] border border-[#A2DFF7] px-5 py-3 rounded-full font-semibold hover:bg-slate-50 transition-all text-sm flex items-center gap-2"
              >
                <Phone size={15} /> Call {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="max-w-4xl mx-auto px-5 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#007B8A] bg-[#007B8A]/10 px-3 py-1 rounded-full">
            Patient Support &amp; Information
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#062226] mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#0A3A40]/80 mt-2">
            Clear answers regarding orthopaedic doctor consultations, joint replacement, arthroscopy, and physiotherapy.
          </p>
        </div>

        <div className="divide-y divide-[#A2DFF7] bg-white rounded-2xl p-6 border border-[#A2DFF7] shadow-sm">
          {faqs.map((f) => (
            <details key={f.q} className="py-4 group">
              <summary className="flex items-center justify-between gap-4 cursor-pointer font-bold text-[#062226] list-none text-sm sm:text-base">
                {f.q}
                <span className="chev text-[#007B8A] transition-transform shrink-0 font-bold">▾</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-[#0A3A40]/85 leading-relaxed">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- Contact & Map ---------- */}
      <section id="contact" className="bg-gradient-to-b from-[#A2DFF7]/20 to-white border-t border-[#A2DFF7]">
        <div className="max-w-6xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#007B8A] bg-[#007B8A]/10 px-3 py-1 rounded-full">
              Hospital Location &amp; Hours
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#062226] mt-3">
              Visit ORTHO MAX MULTI SPECIALITY HOSPITAL
            </h2>

            <div className="mt-6 space-y-4 text-[#0A3A40]">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#007B8A] shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-[#062226]">Address:</p>
                  <p className="text-sm">{ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-[#007B8A] shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-[#062226]">Helpline / OPD Booking:</p>
                  <a href={`tel:${PHONE}`} className="text-sm font-bold text-[#007B8A] hover:underline">
                    +91 {PHONE}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="text-[#007B8A] shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-[#062226]">Hospital &amp; OPD Timings:</p>
                  <p className="text-sm text-[#0A3A40]">
                    <span className="font-semibold">OPD Timings:</span> 9:30 AM – 1:30 PM &amp; 3:30 PM – 6:00 PM
                  </p>
                  <p className="text-xs text-[#007B8A] font-semibold mt-0.5">
                    Emergency &amp; Trauma Care: Open 24/7 (All 7 Days)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 bg-[#007B8A] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#005F6B] transition-colors shadow-sm">
                <Phone size={16} /> Call Now
              </a>
              <a href={MAPS_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-[#3A9AD9] text-[#005F6B] px-6 py-3 rounded-full font-semibold hover:bg-[#A2DFF7]/30 transition-colors">
                Get Directions <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#A2DFF7] min-h-[300px] shadow-md">
            <iframe
              title="ORTHO MAX MULTI SPECIALITY HOSPITAL location on Canal Road, Dehri"
              className="w-full h-full min-h-[300px]"
              loading="lazy"
              src={`https://www.google.com/maps?q=${LAT},${LNG}&z=17&output=embed`}
            />
          </div>
        </div>
      </section>

      {/* ---------- SEO Services Directory (Google Business Profile Keywords) ---------- */}
      <section className="bg-[#031B1E] text-white border-t border-[#A2DFF7]/20 py-12">
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A2DFF7] bg-white/10 px-3 py-1 rounded-full">
              Services Directory
            </span>
            <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-white mt-2">
              Comprehensive Orthopaedic &amp; Multi-Speciality Care Directory
            </h3>
            <p className="text-xs text-white/70 mt-1">
              Providing expert surgical, arthroscopic, and non-surgical treatments for Dehri-on-Sone and the Rohtas region.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs text-white/80">
            <div>
              <p className="font-bold text-[#A2DFF7] text-sm mb-3">Joint Replacement &amp; Surgery</p>
              <ul className="space-y-1.5 text-white/75">
                <li>• Total Knee Replacement (TKR) in Dehri</li>
                <li>• Hip Replacement Surgery for Arthritis</li>
                <li>• Partial Knee Replacement Surgery</li>
                <li>• Knee Arthritis Treatment (गठिया)</li>
                <li>• Severe Knee Pain Relief (घुटने में दर्द)</li>
                <li>• Orthopedic Second Opinion for Surgery</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-[#A2DFF7] text-sm mb-3">Arthroscopy &amp; Sports Injuries</p>
              <ul className="space-y-1.5 text-white/75">
                <li>• ACL Reconstruction Surgery (Anterior Cruciate)</li>
                <li>• PCL Reconstruction Surgery for Knee Injuries</li>
                <li>• Knee Arthroscopy for Meniscus Repair</li>
                <li>• Shoulder Arthroscopy &amp; Joint Surgery</li>
                <li>• Rotator Cuff Tear &amp; Shoulder Pain (कंधे में दर्द)</li>
                <li>• Sports Injury Ligament &amp; Joint Treatment</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-[#A2DFF7] text-sm mb-3">Fractures &amp; Spine Care</p>
              <ul className="space-y-1.5 text-white/75">
                <li>• Fracture Treatment &amp; Trauma Fixation (चोट)</li>
                <li>• Complex Broken Bone Surgeries</li>
                <li>• Nerve Compression Evaluation (नस दबना)</li>
                <li>• Sciatica &amp; Lower Back Pain Treatment</li>
                <li>• Slipped Disc &amp; Cervical Spondylosis Care</li>
                <li>• Geriatric &amp; Pediatric Bone Care</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-[#A2DFF7] text-sm mb-3">Physiotherapy &amp; Regions</p>
              <ul className="space-y-1.5 text-white/75">
                <li>• Post-Surgical Knee &amp; Hip Rehab</li>
                <li>• Physical Therapy for Back &amp; Neck Pain</li>
                <li>• Sports Injury Muscle &amp; Ligament Therapy</li>
                <li>• Physiotherapy for Sciatica &amp; नस दबना</li>
                <li>• Serving Dehri-on-Sone &amp; Dalmianagar</li>
                <li>• Serving Sasaram, Aurangabad &amp; Rohtas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="bg-[#005F6B] text-white">
        <div className="max-w-6xl mx-auto px-5 py-12 grid sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white p-0.5 shrink-0">
                <Image
                  src={IMG.logo}
                  alt="ORTHO MAX MULTI SPECIALITY HOSPITAL Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] font-bold text-base leading-tight">
                  ORTHO MAX MULTI SPECIALITY HOSPITAL
                </p>
                <p className="text-[11px] text-[#A2DFF7] font-semibold mt-0.5">
                  Dr. Kumar Anshuman | Orthopaedic surgeon | Dehri
                </p>
              </div>
            </div>
            <p className="text-sm text-[#A2DFF7] mt-3 max-w-xs leading-relaxed">
              Super-specialty Orthopaedic, Arthroscopy, Fracture &amp; Joint Replacement Centre in Dehri-on-Sone, Rohtas.
            </p>
          </div>

          <div>
            <p className="font-semibold mb-3 text-white">Clinical Specialties</p>
            <ul className="text-sm text-[#A2DFF7] space-y-2">
              {services.slice(0, 4).map((s) => (
                <li key={s.title}>
                  <a href="#services" className="hover:text-white transition-colors">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-3 text-white">Emergency &amp; Location</p>
            <ul className="text-sm text-[#A2DFF7] space-y-2">
              <li>{ADDRESS}</li>
              <li>
                <a href={`tel:${PHONE}`} className="hover:text-white font-bold transition-colors">
                  📞 +91 {PHONE}
                </a>
              </li>
              <li className="text-xs text-white/80">
                <span className="font-semibold text-white">OPD:</span> 9:30 AM – 1:30 PM &amp; 3:30 PM – 6:00 PM
              </li>
              <li className="text-xs text-[#A2DFF7] font-semibold">
                Emergency &amp; Trauma Care Open 24/7
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <p className="max-w-6xl mx-auto px-5 py-4 text-xs text-[#A2DFF7] text-center sm:text-left">
            © {new Date().getFullYear()} ORTHO MAX MULTI SPECIALITY HOSPITAL · Dr. Kumar Anshuman | Orthopaedic surgeon | Dehri. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ---------- Floating Quick Action Buttons (WhatsApp & Call) ---------- */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 items-center">
        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/91${PHONE}?text=${encodeURIComponent("Hello ORTHO MAX MULTI SPECIALITY HOSPITAL, I would like to inquire about consultation with Dr. Kumar Anshuman.")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with ORTHO MAX MULTI SPECIALITY HOSPITAL"
          className="w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl hover:bg-[#1ebd59] hover:scale-110 active:scale-95 transition-all group relative"
        >
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </a>

        {/* Call Button */}
        <a
          href={`tel:${PHONE}`}
          aria-label="Call ORTHO MAX MULTI SPECIALITY HOSPITAL"
          className="w-13 h-13 sm:w-14 sm:h-14 bg-[#007B8A] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#005F6B] hover:scale-110 active:scale-95 transition-all"
        >
          <Phone size={24} />
        </a>
      </div>
    </div>
  );
}