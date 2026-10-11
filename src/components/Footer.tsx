import { profile } from "@/data/cv";
import { ArrowUp } from "./Icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {profile.name}. Crafted with Next.js &amp; care in Dhaka.
        </p>
        <a href="#home" id="footer-to-top" className="to-top">
          Back to top <ArrowUp />
        </a>
      </div>
    </footer>
  );
}
