import { useState } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { AiOutlineWarning } from "react-icons/ai";

import { SearchInput, Text } from "../../components";
import { ShopSelector } from ".";
import { Shop } from "../../hooks/useShop";
import { useShops } from "../../hooks";
import auth from "../../services/auth";

interface Props {
  onShopSelect: (shopId: string) => void;
  selectedShop: string;
}

const ShopSelectors = ({ onShopSelect, selectedShop }: Props) => {
  const { shops: allShops, isLoading } = useShops();
  const [query, setQuery] = useState("");

  const user = auth.getCurrentUser();

  const shops: Shop[] = user?.isAdmin
    ? allShops
    : allShops.filter((s) => s.author._id === user?._id);

  const filtered: Shop[] = query
    ? shops.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
    : shops;

  if (isLoading)
    return (
      <Flex align="center" justify="center">
        <Spinner size="sm" />
        <Text ml={3} textAlign="center">
          Fetching shops...
        </Text>
      </Flex>
    );

  return (
    <>
      <SearchInput
        onTextChange={setQuery}
        placeholder="Search Shop"
        value={query}
      />
      {filtered.length ? (
        filtered.map((shop, index) => (
          <ShopSelector
            key={index}
            onClick={() => onShopSelect(shop._id)}
            selected={selectedShop === shop._id}
            shop={shop}
          />
        ))
      ) : (
        <Flex align="center" justify="center">
          <AiOutlineWarning />
          <Text ml={1} textAlign="center" color="yellow.300">
            None found!
          </Text>
        </Flex>
      )}
    </>
  );
};

export default ShopSelectors;
