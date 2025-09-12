import { useEffect, useState } from "react";
import { CastingCalls, FeaturedArtist, HeroSearch, LoginButtons } from "../../components";
import { API } from "../../api";

export default function HomePage() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch(`${API}/api/pages/home`);
        const result = await res.json();
        if (result.success) {
          setHomeData(result.data);
        }
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!homeData) return <p className="text-center">No data found</p>;

  return (
    <div className="min-h-screen bg-white-300 p-4 mt-8 md:p-8">
      {/* CSS effects */}
      <style>
        {`
          .featured-artist-swiper .swiper-slide img {
            filter: blur(3px) brightness(0.7);
            transition: filter 0.3s ease-in-out;
          }
          .featured-artist-swiper .swiper-slide-active img {
            filter: none;
          }
          .casting-call-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
            cursor: pointer;
            position: relative;
            z-index: 1;
          }
          .casting-call-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                        0 4px 6px -2px rgba(0, 0, 0, 0.05);
            z-index: 2;
          }
        `}
      </style>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto">
        {/* Left Section */}
        <div className="space-y-4 md:space-y-6">
          <HeroSearch birthdayArtists={homeData.birthday_artists} />
        </div>

        {/* Middle Section */}
        <div className="space-y-4 md:space-y-6">
          <FeaturedArtist featuredArtists={homeData.featured_artists} />
          <CastingCalls latestJobs={homeData.latest_jobs} />
        </div>

        {/* Right Section */}
        <div className="space-y-4 md:space-y-6">
          <LoginButtons />
        </div>
      </div>
    </div>
  );
}
