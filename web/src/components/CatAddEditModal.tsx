import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { api } from "~/utils/api";

import { type Cat, type Gender } from "~/utils/types";
import { getBase64FromFile } from "~/utils/utils";

interface IFormValues {
  name: string;
  birthdate: string;
  gender: Gender;
  bio: string;
  images: File[] | null;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  birthdate: Yup.string().required("Birthdate is required"),
  gender: Yup.mixed().oneOf(["F", "M"]),
  bio: Yup.string().required("Bio is required"),
});

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  operation: "add" | "edit";
  cat?: Cat;
}

export function CatAddEditModal({ isOpen, setIsOpen, operation, cat }: IProps) {
  const utils = api.useContext();

  const catAddMutation = api.cats.add.useMutation({
    onSuccess: async () => {
      await utils.cats.getAll.invalidate();
      setIsOpen(false);
    },
  });

  const catEditMutation = api.cats.edit.useMutation({
    onSuccess: async () => {
      await utils.cats.getAll.invalidate();
      setIsOpen(false);
    },
  });

  const isSubmitting = catAddMutation.isLoading || catEditMutation.isLoading;

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: cat?.name || "",
      birthdate: cat?.birthdate.toISOString().substring(0, 10) || "",
      gender: cat?.gender || "F",
      bio: cat?.bio || "",
      images: null,
    },
  });

  const handleClose = () => {
    if (
      isDirty &&
      !window.confirm(
        "You have unsaved changes, are you sure you want to cancel?"
      )
    ) {
      return;
    }
    setIsOpen(false);
    return false;
  };

  const onSubmit = handleSubmit(async (data) => {
    // don't submit if already submitting
    if (isSubmitting) {
      return;
    }

    // get variables from data
    const { images, ...rest } = data;

    // handle image upload
    const imgUrl =
      images?.length === 1 ? await getBase64FromFile(images[0]) : "";

    // call the appropriate mutation based on the operation
    if (operation === "add") {
      catAddMutation.mutate({
        imgUrl,
        ...rest,
      });
      return;
    } else if (operation === "edit") {
      if (!cat) {
        throw new Error("Unable to edit cat");
      }

      catEditMutation.mutate({
        id: cat.id,
        imgUrl: imgUrl || cat.imgUrl,
        ...rest,
      });
      return;
    }

    throw new Error("Invalid operation");
  });

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mb-6 flex justify-between ">
                    <div className="text-xl font-semibold capitalize">
                      {operation} Kitty
                    </div>
                    <div>
                      <button onClick={handleClose}>
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                  <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          data-testid="name"
                          {...register("name")}
                          placeholder="Name"
                          aria-invalid={errors.name ? "true" : "false"}
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                          autoFocus={true}
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.name.message?.toString()}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="birthdate"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Birthdate
                      </label>
                      <div className="mt-2">
                        <input
                          id="birthdate"
                          date-testid="birthdate"
                          type="date"
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                          placeholder="Name"
                          {...register("birthdate")}
                          aria-invalid={errors.birthdate ? "true" : "false"}
                        />
                      </div>
                      {errors.birthdate && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.birthdate.message?.toString()}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Gender
                      </label>
                      <div className="mt-2">
                        <select
                          id="gender"
                          {...register("gender")}
                          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-600 sm:text-sm sm:leading-6"
                          defaultValue="Female"
                          aria-invalid={errors.gender ? "true" : "false"}
                        >
                          <option value="F">Female</option>
                          <option value="M">Male</option>
                        </select>
                      </div>
                      {errors.gender && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.gender.message?.toString()}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="bio"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Bio
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="bio"
                          {...register("bio")}
                          rows={4}
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                          aria-invalid={errors.bio ? "true" : "false"}
                        />
                      </div>
                      {errors.bio && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.bio.message?.toString()}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Image
                      </label>
                      <div className="mt-2">
                        <input
                          id="image"
                          type="file"
                          accept="image/*"
                          multiple={false}
                          {...register("images")}
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                          aria-invalid={errors.images ? "true" : "false"}
                        />
                      </div>
                      {errors.images && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.images.message?.toString()}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end gap-x-4">
                      <button
                        type="button"
                        className="py-1 px-4 capitalize"
                        onClick={handleClose}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded bg-black py-1 px-4 capitalize text-white"
                        disabled={isSubmitting}
                      >
                        {operation}
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
