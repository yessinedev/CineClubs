import Categories from "@/components/Home/Categories";
import FeaturedClubs from "@/components/Home/FeaturedClubs";
import Hero from "@/components/Home/Hero";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedClubs />
    </main>
  );
};

export default HomePage;
