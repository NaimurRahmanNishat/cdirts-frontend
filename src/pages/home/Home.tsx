import DivisionIssues from "@/components/home/DivisionIssues";
import HeroImageSlider from "@/components/home/HeroImageSlider";
import HistoryIssues from "@/components/home/HistoryIssues";


const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroImageSlider />
      <div className="pt-[920px] md:pt-[660px]">
        <DivisionIssues />
        <HistoryIssues />
      </div>
      
    </div>
  )
}

export default Home;