import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { Form, FormField, SubmitButton } from "../components/forms";
import { Listing, getSchema } from "../hooks/useListing";
import { useForm, useImages, useListings } from "../hooks";
import auth from "../services/auth";
import CategorySelect from "../components/CategorySelect";
import ImageInputList from "../components/ImageInputList";
import listingsService from "../services/listings";

const schema = getSchema(true);

type FormData = z.infer<typeof schema>;

const MAX_IMAGES = 3;

const ListingEditPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { errors, handleSubmit, register, reset } = useForm(schema);
  const user = auth.getCurrentUser();
  const { imagesCount, images, removeAllImages } = useImages(MAX_IMAGES);
  const { addListing } = useListings();

  const doSubmit = async (info: FormData) => {
    if (error) setError("");
    if (!imagesCount) {
      const errorMessage = "Please select at least one image";
      toast.error(errorMessage);
      return setError(errorMessage);
    }

    setLoading(true);
    const listing = { ...info, images };
    const { data, ok, problem } = await listingsService.addListing(listing);
    setLoading(false);

    if (!ok) return setError((data as any)?.error || problem);

    toast.success("Listing created successfully");
    addListing(data as Listing);
    reset();
    removeAllImages();
  };

  if (!user) return <Navigate to="/login" replace />;

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={doSubmit}
      error={error}
      title="New Listing"
    >
      <ImageInputList imagesLimit={MAX_IMAGES} />
      <FormField error={errors.title} register={register} label="Title" />
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
      <CategorySelect register={register} />
      <SubmitButton label="Create" isLoading={isLoading} />
    </Form>
  );
};

export default ListingEditPage;
