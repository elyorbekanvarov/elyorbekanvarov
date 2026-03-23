import Image from "next/image";
import { footerData } from "@/data/footer";

export default function Footer() {
  return (
    <footer>
      <div className="container footer-wrapper">
        <div className="footer-title">
          <p>{footerData.text}</p>
        </div>
        <div className="footer-links">
          {footerData.links.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noreferrer">
              <Image src={link.icon} alt="social-icon" width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
