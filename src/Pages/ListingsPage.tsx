import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Category } from "../hooks/useCategories";
import {
  ListingCategoriesGridPageContainer as GridPageContainer,
  ListingGrid,
  NewItemButton as NewListingButton,
} from "../components";
import { endpoint } from "../services/listings";
import useListing, { Listing } from "../hooks/useListing";
import useListings from "../hooks/useListings";

const ListingsPage = () => {
  const navigate = useNavigate();
  const { setListing } = useListing();
  const { data, error, isLoading } = useListings();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const navigateToDetails = (listing: Listing) => {
    setListing(listing);
    navigate(`${endpoint}/${listing._id}`);
  };

  return (
    <GridPageContainer
      selectedCategory={selectedCategory}
      onSelectCategory={setSelectedCategory}
    >
      <NewListingButton pageUrl="/listings" />
      <ListingGrid
        error={error}
        isLoading={isLoading}
        listings={data}
        onListingClick={navigateToDetails}
        selectedCategory={selectedCategory}
      />
    </GridPageContainer>
  );
};

export default ListingsPage;
