import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  const slides = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Mengatur waktu pergeseran otomatis (3000ms atau 3 detik)

    return () => clearInterval(interval); // Membersihkan interval saat komponen unmount
  }, [slides.length]);

  return (
    <div className="flex items-center justify-between px-10 py-20">
      {/* Bagian Kiri - Teks Penyambutan */}
      <div className="w-full lg:w-1/2 text-left">
        <h1 className="text-4xl font-bold mb-4">Selamat Datang di EcoRecipe!</h1>
        <p className="text-lg mb-4">
          Selamat datang di EcoRecipe, platform berbagi resep yang tidak hanya memanjakan selera, tetapi juga ramah lingkungan! Di sini, kami percaya bahwa makanan sehat dan keberlanjutan bisa berjalan seiring. Jelajahi berbagai resep inovatif yang dibuat dari bahan-bahan segar, alami, dan berdampak positif untuk bumi.
        </p>
        <p className="text-lg mb-4">
          Mari bersama-sama menciptakan perubahan dari dapur kita. Bagikan resep favoritmu, temukan inspirasi baru, dan wujudkan gaya hidup sehat yang berkelanjutan. Setiap langkah kecil di dapur bisa menjadi langkah besar bagi bumi kita!
        </p>
        {/* Tombol ChatBot dan Login */}
        <div className="mt-6 flex gap-4">
          {/* Tombol ChatBot */}
          <Link to="/chatbot-ai" className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mb-4">
            ChatBot
          </Link>
          {/* Tombol Login */}
          <a href="/login" className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mb-4">
            Login
          </a>
        </div>
      </div>

      {/* Bagian Kanan - Carousel */}
      <div className="w-full lg:w-1/2">
        <div className="carousel w-full h-[80vh]">
          {slides.map((src, index) => (
            <div
              key={index}
              className={`carousel-item relative w-full ${index === currentSlide ? 'block' : 'hidden'}`}
            >
              <img
                src={src}
                className="w-full h-full object-cover"
                alt={`Slide ${index + 1}`}
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <button
                  className="btn btn-circle"
                  onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
                >
                  ❮
                </button>
                <button
                  className="btn btn-circle"
                  onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
                >
                  ❯
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;