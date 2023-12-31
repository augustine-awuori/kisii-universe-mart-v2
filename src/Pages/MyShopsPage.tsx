import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { ShopsGrid, ShopsTypesGridPageContainer } from "../components";
import { Type } from "../hooks/useTypes";
import auth from "../services/auth";
import useData from "../hooks/useData";
import useShop, { Shop } from "../hooks/useShop";

const MyShopsPage = () => {
  const user = auth.getCurrentUser();
  const { data: shops, error, isLoading } = useData<Shop>(`shops/${user?._id}`);
  const [selectedType, setSelectedType] = useState<Type | null>(null);
  const navigate = useNavigate();
  const { setShop } = useShop();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);

  const navigateToDetails = (shop: Shop) => {
    setShop(shop);
    navigate(shop._id);
  };

  if (!user) return <Navigate to="/" />;

  return (
    <ShopsTypesGridPageContainer
      onSelectType={setSelectedType}
      selectedType={selectedType}
      gridHeadingLabel="My Shops"
    >
      <ShopsGrid
        currentPage={currentPage}
        error={error}
        isLoading={isLoading}
        onPageChange={setCurrentPage}
        onShopClick={navigateToDetails}
        pageSize={pageSize}
        selectedType={selectedType}
        shops={shops}
      />
    </ShopsTypesGridPageContainer>
  );
};

export default MyShopsPage;
