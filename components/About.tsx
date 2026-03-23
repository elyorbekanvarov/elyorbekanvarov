"use client";

import { useEffect, useState } from "react";
import { AboutService } from "@/lib/api/aboutServices";
import type { About } from "@/lib/api/aboutServices";
import Image from "next/image";

export default function About() {
  const [aboutList, setAboutList] = useState<About[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await AboutService.getAbout();
        console.log("About data:", data);
        setAboutList(data);
      } catch (err) {
        console.error("Error fetching about:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) {
    return <div style={{ textAlign: "center", padding: "60px", color: "#9ca3af" }}>Loading...</div>;
  }

  return (
    <section id="about" className="section2">
      <div className="section2-wrapper container">
        <h2>About Me</h2>
        <div className="cards-row">
          {aboutList.length > 0 ? (
            aboutList.map((item) => (
              <div key={item.id} className="about-card">
                {item.image_url && (
                  <div className="card-image">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="card-icon-img"
                    />
                  </div>
                )}
                <span className="card-title">{item.name}</span>
                {item.role && <span className="card-role">{item.role}</span>}
                <p className="card-desc">{item.bio}</p>
              </div>
            ))
          ) : (
            <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#9ca3af", padding: "40px" }}>
              No about information added yet. Add in admin panel.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}