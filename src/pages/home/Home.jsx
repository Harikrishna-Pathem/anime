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
import { Route, Routes, useLocation } from "react-router-dom";
import CategoriesHome from "../../components/featuredcollection/CategoriesHome";
import CategoriesPage from "../../components/featuredcollection/CategoriesPage";
import FeaturedProductsHome from "../../components/featuredproducts/FeaturedProductsHome";
import FeaturedProductsList from "../../components/featuredproducts/FeaturedProductsList";
import Wishlist from "../../components/wishlists/Wishlist";
import CategoryProducts from "../../components/products/CategoryProducts";
import SingleProductPage from "../../components/singleproduct/SingleProductPage";
import { useEffect, useRef } from "react";

const Home = ({ setShowLogin }) => {


  
  const bundleRef = useRef(null);
  const categoriesRef = useRef(null);
  const reviewsRef = useRef(null);
  const animeCollectionRef = useRef(null);
  const charactersRef = useRef(null);
  const featuredProductsRef = useRef(null);


  const location = useLocation();

  const sectionRefs = {
    
    bundles: bundleRef,
    categories: categoriesRef,
    reviews: reviewsRef,
    animecollection: animeCollectionRef,
    characters: charactersRef,
    featured: featuredProductsRef
  }

  const scrollToSection = (sectionName) => {
    const ref = sectionRefs[sectionName];
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  // useEffect(() => {
  //   if (location.pathname === "/bundles") {
  //     bundleRef.current?.scrollIntoView({ behavior: "smooth" })
  //   }
  // }, [location])

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
      <Navbar setShowLogin={setShowLogin} scrollToSection={scrollToSection} />

      <Routes>
        <Route
          path="/*"
          element={
            <div>
              <Header />
              <div ref={categoriesRef}>
                <CategoriesHome products={products} />
              </div>
              <div ref={bundleRef}>
                <BundlesDeals products={products} />
              </div>
              <div ref={featuredProductsRef}>
                <FeaturedProductsHome products={products} />
              </div>
              <div ref={reviewsRef}>
                <Reviews />
              </div>
              <SecureSteps />
            </div>
          }
        />

        <Route path="/bundles" element={<BundlesDeals products={products} />} />
        <Route path="/categories/:categoryName/products" element={<CategoryProducts />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route path="/products" element={<FeaturedProductsList />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
};

export default Home;
