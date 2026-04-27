import React, { Suspense } from "react";
import { Route, Routes } from "react-router";

const AppLayout = React.lazy(() => import("../layout/AppLayout"));
const LandingPage = React.lazy(() => import("../pages/Landing/LandingPage"));
const FoodPage = React.lazy(() => import("../pages/Food/FoodPage"));
const JewelPage = React.lazy(() => import("../pages/Jewel/JewelPage"));
const WoodPage = React.lazy(() => import("../pages/Wood/WoodPage"));
const LikePage = React.lazy(() => import("../pages/Like/LikePage"));
const ShopPage = React.lazy(() => import("../pages/Shop/ShopPage"));
const SeasonPage = React.lazy(() => import("../pages/Season/SeasonPage"));

const AppRouter = () => {
  return (
    <Suspense fallback={<div>...loading</div>}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/jewel" element={<JewelPage />} />
          <Route path="/wood" element={<WoodPage />} />
          <Route path="/like" element={<LikePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/season" element={<SeasonPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
