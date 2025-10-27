import watarOne from "../../assets/hero/watarOne.jpg";
import gasOne from "../../assets/hero/gasOne.jpg";
import watarTwo from "../../assets/hero/watarTwo.jpg";
import roadOne from "../../assets/hero/roadOne.jpg";
import gasTwo from "../../assets/hero/gasTwo.jpg";

interface HeroImage {
  id: number;
  image: string;
}

const heroImage: HeroImage[] = [
  { id: 1, image: watarOne },
  { id: 2, image: gasOne },
  { id: 3, image: watarTwo },
  { id: 4, image: roadOne },
  { id: 5, image: gasTwo },
];

const HeroImageSlider = () => {
  return (
    <div className="absolute top-20 left-0 w-full h-[900px] overflow-hidden">
      <div className="flex animate-slide">
        {[...heroImage, ...heroImage].map((img, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[1920px] h-[900px]"
          >
            <img
              src={img.image}
              alt={`slider-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-slide {
          display: flex;
          width: calc(1920px * 10);
          animation: slide 100s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroImageSlider;
