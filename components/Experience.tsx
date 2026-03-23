"use client";
import { useEffect, useState } from "react";
import { ExperiencesService} from "@/lib/api/experiencesServices";
import Awards from "./Awards";
interface ExperienceItem {
  id?: number;
  role: string;
  company: string;
  description: string;
  start_date: string;
  end_date?: string;
}
export default function Experience() {
  const [experienceData, setExperienceData] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const data = await ExperiencesService.getExperiences();
        console.log("Experience data:", data);
        setExperienceData(data as ExperienceItem[]);
      } catch (err) {
        console.error("Error fetching experience:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  if (loading) {
    return <div style={{ textAlign: "center", padding: "40px" }}>Loading experience...</div>;
  }

  if (experienceData.length === 0) {
    return (
      <section id="experience" className="experience-section">
        <div className="container">
          <h2 className="experience-title">Experience & Education</h2>
          <p style={{ textAlign: "center", padding: "40px" }}>No experience data found. Add your experience in admin panel.</p>
          <Awards />
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <h2 className="experience-title">Experience & Education</h2>
        <div className="timeline">
          {experienceData.map((item, index) => (
            <div
              key={item.id || index}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
            >
              <div className="timeline-icon">
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: "#4f46e5",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  💼
                </div>
              </div>
              <div className="timeline-card">
                <span className="year">
                  {item.start_date} {item.end_date ? `- ${item.end_date}` : "- Present"}
                </span>
                <h3>{item.role}</h3>
                <h4>{item.company}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Awards />
      </div>
    </section>
  );
}