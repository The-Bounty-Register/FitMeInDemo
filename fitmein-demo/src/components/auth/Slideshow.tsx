import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1470&auto=format&fit=crop",
];

export function Slideshow() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      {images.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: currentImage === index ? 1 : 0,
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}
    </div>
  );
}