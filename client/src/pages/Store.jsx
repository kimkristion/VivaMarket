import ProductCard from "../components/ProductCard";
import Banner from '../assets/shopBanner.jpg';

export default function Store() {
  return (
    <div className='shop'>
      <div className="banner">
        <img src={Banner} alt="shop banner" />
        <h1>Welcome to VivaMarket!</h1>
        <p>Discover a wide range of products for all your needs.</p>
      </div>
      <ProductCard />
    </div>
  );
}
