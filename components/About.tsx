"use client";

import { useEffect, useState } from "react";
import { AboutService } from "@/lib/api/aboutServices";
import Image from "next/image";
interface AboutItem {
  id: number;
  name: string;
  role?: string;
  bio: string;
  image?: string;
}

export default function About() {
  const [aboutData, setAboutData] = useState<AboutItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await AboutService.getAbout();
        console.log("About data:", data);
        setAboutData(data as AboutItem[]);
      } catch (err) {
        console.error("Error fetching about:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <section id="about" className="section2">
      <div className="section2-wrapper container">
        <h2>About Me</h2>
        <div className="cards-row">
          {aboutData.length > 0 ? (
            aboutData.map((item) => (
              <div key={item.id} className="about-card">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="card-icon-img"
                  />
                )}
                <span className="card-title">{item.name}</span>
                {item.role && <span className="card-role">{item.role}</span>}
                <p className="card-desc">{item.bio}</p>
              </div>
            ))
          ) : (
            <p>No about information added yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}