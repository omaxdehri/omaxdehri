import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";

export interface BlogPost {
  _id?: ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    title: string;
    avatarUrl?: string;
  };
  readTime: string;
  published: boolean;
  featured?: boolean;
  views?: number;
  createdAt: Date;
  updatedAt: Date;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\p{L}\p{M}\p{N}\-]+/gu, "") // Preserves ALL Unicode letters & Hindi Devanagari vowel marks
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}

export async function ensureDefaultBlogs(): Promise<void> {
  try {
    const db = await getDb();
    const count = await db.collection("blogs").countDocuments();

    if (count === 0) {
      const sampleBlogs: BlogPost[] = [
        {
          title: "Complete Guide to Total Knee Replacement Surgery: Benefits, Procedure & Recovery",
          slug: "complete-guide-total-knee-replacement-surgery",
          excerpt:
            "Severe knee arthritis (गठिया) shouldn't steal your independence. Discover how modern minimally invasive knee replacement helps patients walk pain-free again.",
          category: "Joint Replacement",
          tags: ["Knee Replacement", "Arthritis", "Joint Pain", "Orthopaedics"],
          coverImage: "/front_image_orthomax_hospital_orthopedic_surgeon_dehri.png",
          author: {
            name: "Dr. Kumar Anshuman",
            title: "Senior Orthopaedic & Joint Replacement Surgeon",
            avatarUrl: "/Dr._Kumar_Anshuman_mbbs_orthomax_hospital_orthopedic_surgeon_dehri.jpeg",
          },
          readTime: "5 min read",
          published: true,
          featured: true,
          views: 120,
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          content: `
### Understanding Chronic Knee Arthritis (गठिया)

Osteoarthritis of the knee is one of the most common degenerative joint diseases seen in Rohtas and across Bihar. As the smooth cushioning cartilage between the thigh bone and shin bone wears down, bone rubs against bone.

#### Common Symptoms of Advanced Arthritis:
- Persistent knee aching that wakes you at night
- Stiffness after waking or sitting for long periods
- Difficulty climbing stairs, squatting, or sitting crossed-legged
- Bowing or deformation of legs (varus deformity)

---

### What Happens During Total Knee Replacement (TKR)?

During a modern Total Knee Replacement, our surgical team removes the damaged cartilage and bone surface and resurfaces it with high-precision medical-grade biocompatible alloy implants and an ultra-durable polyethylene spacer.

> "Modern surgical technique focuses on tissue-sparing approaches, ensuring minimal blood loss and enabling same-day or next-day assisted walking." — **Dr. Kumar Anshuman**

### Key Benefits for Patients:
1. **Dramatic Pain Elimination:** 90-95% of patients experience complete relief from severe arthritic pain.
2. **Restored Mobility:** Return to pain-free walking, morning strolls, and everyday household chores.
3. **Decades of Durability:** Contemporary implants are engineered to last 20 to 25+ years with proper rehabilitation.

---

### Dedicated Post-Operative Rehabilitation at Ortho Max

Surgery is only the first milestone; structured physiotherapy ensures optimal strength and joint range of motion. Our in-house Physiotherapy Centre guides you step-by-step with personalized quad strengthening and gait training exercises.

If chronic knee pain has restricted your daily life, visit **ORTHO MAX MULTI SPECIALITY HOSPITAL, Canal Road, Dehri** for a comprehensive evaluation and digital X-ray review.
`,
        },
        {
          title: "ACL Tear & Knee Arthroscopy: When is Keyhole Surgery Necessary?",
          slug: "acl-tear-knee-arthroscopy-keyhole-surgery",
          excerpt:
            "Heard a 'pop' in your knee during sports or bike accident? Understand the symptoms of an anterior cruciate ligament (ACL) injury and keyhole arthroscopic repair.",
          category: "Knee Arthroscopy",
          tags: ["ACL Reconstruction", "Sports Injury", "Arthroscopy", "Ligament Tear"],
          coverImage: "/carousel/03-modular-operation-theater.jpeg",
          author: {
            name: "Dr. Kumar Anshuman",
            title: "Senior Orthopaedic & Joint Replacement Surgeon",
            avatarUrl: "/Dr._Kumar_Anshuman_mbbs_orthomax_hospital_orthopedic_surgeon_dehri.jpeg",
          },
          readTime: "4 min read",
          published: true,
          featured: false,
          views: 85,
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          content: `
### What is the Anterior Cruciate Ligament (ACL)?

The ACL is one of the primary stabilizing ligaments inside your knee joint, preventing the shin bone from sliding out in front of the thigh bone and providing rotational stability during pivoting movements.

#### How Do ACL Tears Happen?
- Sudden pivoting, twisting or deceleration while running
- Direct collisions during soccer, cricket, or motor accident
- Awkward landings from a jump

### Warning Signs of an ACL Tear:
- An audible **'pop'** sensation followed by acute knee swelling within hours
- Severe instability — a feeling that the knee is "giving way" (घुटने का लचकना)
- Loss of full range of motion and inability to bear weight comfortably

---

### Why Minimally Invasive Arthroscopic Surgery is Gold Standard

At Ortho Max Hospital Dehri, Dr. Kumar Anshuman performs keyhole arthroscopy using high-definition fiberoptic cameras. 

- **Pencil-sized incisions:** Minimal scar tissue and virtually no muscle trauma.
- **Autograft tendon reconstruction:** Creating an anatomical, rock-solid replacement ligament.
- **Faster return to active lifestyle:** Most patients are able to resume light activity within weeks and return to recreational sports after structured rehabilitation.
`,
        },
        {
          title: "Sciatica & Nerve Compression (नस दबना): Causes, Non-Surgical Relief & When to Seek Help",
          slug: "sciatica-nerve-compression-causes-relief",
          excerpt:
            "Shooting pain traveling from your lower back down your leg? Learn what causes sciatica (नस दबना), ergonomic tips, and advanced treatments available in Dehri.",
          category: "Spine & Sciatica",
          tags: ["Sciatica", "Back Pain", "Nerve Compression", "Physiotherapy"],
          coverImage: "/carousel/07-physiotherapy-center.jpeg",
          author: {
            name: "Dr. Kumar Anshuman",
            title: "Senior Orthopaedic & Joint Replacement Surgeon",
            avatarUrl: "/Dr._Kumar_Anshuman_mbbs_orthomax_hospital_orthopedic_surgeon_dehri.jpeg",
          },
          readTime: "4 min read",
          published: true,
          featured: false,
          views: 140,
          createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          content: `
### What is Sciatica (नस दबना)?

Sciatica refers to pain radiating along the path of the sciatic nerve, which branches from your lower back through your hips, buttocks, and down each leg. Typically, sciatica affects only one side of the body.

#### Frequent Triggers:
- **Herniated or bulging lumbar disc** putting direct pressure on nerve roots
- **Lumbar canal stenosis** (narrowing of the spinal canal)
- Prolonged sitting in hunched postures or lifting heavy weights improperly

---

### Non-Surgical Treatment Pathways
Over 85% of sciatica cases improve without surgery when treated promptly with:
1. Targeted anti-inflammatory medical protocols
2. Specialized core strengthening and spinal decompression physiotherapy
3. Posture correction and ergonomic workspace modifications

Visit our outpatient clinic at Ortho Max Hospital Canal Road, Dehri for accurate clinical assessment and spine screening.
`,
        },
        {
          title: "Understanding ACL Injury",
          slug: "understanding-acl-injury",
          excerpt:
            "The Anterior Cruciate Ligament (ACL) is crucial for knee stability. Understand common symptoms, diagnosis, and arthroscopic treatment options.",
          category: "Knee Arthroscopy",
          tags: ["ACL Injury", "Knee Pain", "Arthroscopy", "Ligament"],
          coverImage: "/carousel/03-modular-operation-theater.jpeg",
          author: {
            name: "Dr. Kumar Anshuman",
            title: "Senior Orthopaedic & Joint Replacement Surgeon",
            avatarUrl: "/Dr._Kumar_Anshuman_mbbs_orthomax_hospital_orthopedic_surgeon_dehri.jpeg",
          },
          readTime: "3 min read",
          published: true,
          featured: true,
          views: 95,
          createdAt: new Date(),
          updatedAt: new Date(),
          content: `### Understanding ACL Injury

The Anterior Cruciate Ligament (ACL) is an important ligament that provides stability to the knee joint.

#### Common Symptoms:
- Knee pain and swelling.
- Popping sensation during injury.
- Difficulty walking.
- Knee instability.

---

### Treatment Options

Treatment may include physiotherapy, rehabilitation or arthroscopic ACL reconstruction surgery, depending on the severity of the injury.

Consult an orthopaedic specialist for proper diagnosis and treatment.

**Dr. Kumar Anshuman**  
ORTHO MAX MULTI SPECIALITY HOSPITAL, Dehri-on-Sone.
`,
        },
      ];

      await db.collection("blogs").insertMany(sampleBlogs as any);
      console.log("Sample orthopaedic blogs seeded successfully into orthomax_hospital.blogs!");
    }
  } catch (error) {
    console.error("Failed to seed default blogs:", error);
  }
}
