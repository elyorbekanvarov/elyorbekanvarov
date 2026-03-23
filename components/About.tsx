"use client";

import { useEffect, useState } from "react";
import { AboutService } from "@/lib/api/aboutServices";
<<<<<<< HEAD
import type { About } from "@/lib/api/aboutServices";
import Image from "next/image";

export default function About() {
  const [aboutList, setAboutList] = useState<About[]>([]);
=======
import Image from "next/image";
import { aboutData } from "@/data/about";

interface AboutItem {
  id: number;
  name: string;
  role?: string;
  bio: string;
  image?: string;
}

export default function About() {
  const [aboutData, setAboutData] = useState<AboutItem[]>([]);
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await AboutService.getAbout();
<<<<<<< HEAD
        console.log("About data:", data);
        setAboutList(data);
      } catch (err) {
        console.error("Error fetching about:", err);
=======
        console.log("About data from backend:", data);
        
        if (data && data.length > 0) {
          setAboutData(data as AboutItem[]);
        } else {
          // Mock data
          setAboutData([{
            id: 1,
            name: "Elyorbek Anvarov",
            role: "Frontend Developer",
            bio: "I'm a passionate Frontend Developer with a strong focus on creating beautiful, functional, and user-friendly web experiences. With expertise in modern web technologies, I transform ideas into reality.",
            image: "/images/png/about.png"
          }]);
        }
      } catch (err) {
        console.error("Error fetching about:", err);
        setAboutData([{
          id: 1,
          name: "Elyorbek Anvarov",
          role: "Frontend Developer",
          bio: "I'm a passionate Frontend Developer with a strong focus on creating beautiful, functional, and user-friendly web experiences.",
          image: "/images/png/about.png"
        }]);
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

<<<<<<< HEAD
  if (loading) {
    return <div style={{ textAlign: "center", padding: "60px", color: "#9ca3af" }}>Loading...</div>;
  }
=======
  if (loading) return <p>Loading...</p>;
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b

  return (
    <section id="about" className="section2">
      <div className="section2-wrapper container">
        <h2>About Me</h2>
        <div className="cards-row">
<<<<<<< HEAD
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
=======
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
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
                )}
                <span className="card-title">{item.name}</span>
                {item.role && <span className="card-role">{item.role}</span>}
                <p className="card-desc">{item.bio}</p>
              </div>
            ))
          ) : (
<<<<<<< HEAD
            <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#9ca3af", padding: "40px" }}>
              No about information added yet. Add in admin panel.
            </p>
=======
            <p>No about information added yet.</p>
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
          )}
        </div>
      </div>
    </section>
  );
}