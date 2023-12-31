import { useState } from "react";
import { Navigate } from "react-router-dom";

import { Form, FormField, SubmitButton } from "../form";
import { ProductFormData, productSchema } from "../../data/schemas";
import { useForm, useImages, useProducts } from "../../hooks";
import authApi from "../../services/auth";
import ImageInputList from "../common/ImageInputList";

const IMAGES_COUNT = 1;

interface Props {
  onDone: () => void;
  shopId: string;
}

const NewProductForm = ({ onDone, shopId }: Props) => {
  const { errors, handleSubmit, register, reset } = useForm(productSchema);
  const { imagesCount, images, removeAllImages } = useImages(IMAGES_COUNT);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = authApi.getCurrentUser();
  const products = useProducts(shopId);

  const makeShopFrom = (info: ProductFormData) => {
    if (user)
      return { ...info, author: user._id, image: images[0], shop: shopId };
  };

  const doSubmit = async (info: ProductFormData) => {
    if (error) setError("");
    if (!imagesCount) return setError("Select an image");
    const shop = makeShopFrom(info);
    if (!user || !shop) return;

    setLoading(true);
    const { error: message, ok } = await products.create(shop);
    setLoading(false);
    if (!ok) return setError(message);

    onDone();
    removeAllImages();
    reset();
  };

  if (!user) return <Navigate to="/login" replace />;

  return (
    <Form
      error={error}
      handleSubmit={handleSubmit}
      onSubmit={doSubmit}
      title="New Product"
      usePageContainer={false}
    >
      <ImageInputList imagesLimit={IMAGES_COUNT} />
      <FormField error={errors.name} label="Name" register={register} />
      <FormField
        error={errors.price}
        label="Price"
        register={register}
        type="number"
      />
      <FormField
        error={errors.description}
        label="Description"
        register={register}
      />
      <SubmitButton label="Save" isLoading={isLoading} />
    </Form>
  );
};

export default NewProductForm;
