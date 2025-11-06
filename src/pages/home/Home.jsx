import FeaturedCollection from "../../components/featuredcollection/FeaturedCollection";
import FeaturedProducts from "../../components/featuredproducts/FeaturedProducts";
import Footer from "../../components/footer.jsx/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import product_one from "../../images/product_one.jpg";
import product_two from "../../images/product_two.png";
import product_three from "../../images/product_three.png";
import product_four from "../../images/product_four.png";
import BundlesDeals from "../../components/bundlesdeals/BundleDeals";
import Reviews from "../../components/reviews/Reviews";
import SecureSteps from "../../components/securesteps/SecureSteps";

const Home = () => {
  const products = [
    {
      id: 1,
      image: product_one,
      name: "Naruto Collection",
      items: 15,
      price: 1499,
    },
    {
      id: 2,
      image: product_two,
      name: "Demon Slayer Collection",
      items: 15,
      price: 1299,
    },
    {
      id: 3,
      image: product_three,
      name: "One Piece Collection",
      items: 15,
      price: 1599,
    },
    {
      id: 4,
      image: product_four,
      name: "All Time Favorites",
      items: 150,
      price: 4999,
    },
    {
      id: 5,
      image: product_one,
      name: "Attack on Titan Collection",
      items: 25,
      price: 1999,
    },
    {
      id: 6,
      image: product_two,
      name: "My Hero Academia",
      items: 30,
      price: 2199,
    },
  ];

  return (
    <>
      <div>
        {/* <Navbar /> */}
        <Header />
        <FeaturedCollection products={products} />
        <BundlesDeals products={products} />
        <FeaturedProducts products={products} />
        <Reviews />
        <SecureSteps />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
