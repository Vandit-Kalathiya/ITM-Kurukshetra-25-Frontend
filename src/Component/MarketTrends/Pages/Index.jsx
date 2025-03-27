import Hero from '../components/Hero';
import TrendingCrops from '../components/TrendingCrops';
import MarketInsights from '../components/MarketInsights';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CurrentMonthHighlights from '../components/CurrentMonthHighlights';
import EnhancedRecommendations from '../components/EnhancedRecommendations';
import SubscriptionBanner from '../components/SubscriptionBanner';
import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, BarChart3, Lightbulb, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { getCurrentMonth, getCurrentYear } from '../Utils/DateUtils';

const Index = () => {
  const currentMonth = getCurrentMonth();
  const currentYear = getCurrentYear();

  return (
    <div className="min-h-screen">
      {/* <Header /> */}
      {/* <Hero /> */}
      <div className="container px-4 py-12 mx-12  ">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-primary">📊</span>
            <span>Indian Agricultural Market | {currentMonth} {currentYear}</span>
          </h2>
          <CurrentMonthHighlights />
        </div>
        <TrendingCrops />
        <div className="mb-16">
          <EnhancedRecommendations />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-forest-950/50 border rounded-xl p-6 shadow-sm card-hover">
            <div className="bg-forest-100 dark:bg-forest-900 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Sprout className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Crop Directory</h3>
            <p className="text-muted-foreground mb-4">
              Browse our comprehensive database of over 150 Indian crops with detailed information.
            </p>
            <Link to="/trends">
              <Button variant="link" className="px-0 flex items-center gap-1 text-primary">
                <span>Explore crops</span>
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
          <div className="bg-white dark:bg-forest-950/50 border rounded-xl p-6 shadow-sm card-hover">
            <div className="bg-forest-100 dark:bg-forest-900 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Market Prices</h3>
            <p className="text-muted-foreground mb-4">
              Get real-time price updates from major agricultural markets across India.
            </p>
            <Link to="/market">
              <Button variant="link" className="px-0 flex items-center gap-1 text-primary">
                <span>Check prices</span>
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
          <div className="bg-white dark:bg-forest-950/50 border rounded-xl p-6 shadow-sm card-hover">
            <div className="bg-forest-100 dark:bg-forest-900 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Insights</h3>
            <p className="text-muted-foreground mb-4">
              Receive data-driven recommendations and market forecasts for better decision making.
            </p>
            <Link to="/insights">
              <Button variant="link" className="px-0 flex items-center gap-1 text-primary">
                <span>View insights</span>
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
        <MarketInsights />
        {/* <SubscriptionBanner /> */}
        {/* <div className="bg-gradient-to-br from-forest-50 to-forest-100 dark:from-forest-950 dark:to-forest-900 rounded-xl p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white dark:bg-white/10 px-3 py-1.5 rounded-full text-sm font-medium text-primary mb-4">
                <ArrowUpRight size={14} />
                <span>Get Personalized Updates</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay informed with market alerts
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Sign up to receive timely price alerts, market updates, and personalized recommendations for your crops.
              </p>
              <Button size="lg" className="px-8">
                Register Now
              </Button>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Farmer using a smartphone" 
                className="rounded-xl shadow-lg max-w-full md:max-w-md"
              />
            </div>
          </div>
        </div> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Index;