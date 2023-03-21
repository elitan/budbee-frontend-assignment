import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { api } from "~/utils/api";
import { type Cat } from "~/utils/types";

export function CatListItem({ cat }: { cat: Cat }) {
  const utils = api.useContext();

  const deleteMutation = api.cats.delete.useMutation({
    onSuccess: async () => {
      await utils.cats.getAll.invalidate();
    },
  });

  return (
    <div className="max-h-80 rounded-md border border-gray-900 bg-gray-200 p-6">
      <div className="flex justify-between">
        <div />
        <div className="flex gap-x-3">
          <div>
            <button
              onClick={() => {
                console.log("edit");
              }}
              className="p-1"
            >
              <PencilSquareIcon className="h-4 w-4 cursor-pointer" />
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                if (!window.confirm("Are you sure?")) {
                  return;
                }
                deleteMutation.mutate({
                  id: cat.id,
                });
              }}
              className="p-1"
            >
              <TrashIcon className="h-4 w-4 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-2">img...</div>
        <div className="col-span-3">
          <div className="mb-3 font-bold">{cat.name}</div>
          <div className="line-clamp whitespace-pre-line line-clamp-5">
            {cat.bio}
          </div>
        </div>
      </div>
    </div>
  );
}
