import Image from "next/image";
import { awards } from "@/data/awards";
export default function Awards() {
  return (
    <div className="awards-section">
      <h3 className="awards-title">Certifications & Awards</h3>
      <div className="awards-items">
        {awards.map((award) => (
          <div key={award.id} className="award">
            <Image
              src={award.image}
              alt={award.title}
              width={30}
              height={36}
            />
            <h4>{award.title}</h4>
            <p>{award.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}