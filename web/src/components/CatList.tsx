import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { api } from "~/utils/api";

export function CatList() {
  const utils = api.useContext();

  const catsQuery = api.cats.getAll.useQuery();
  const deleteMutation = api.cats.delete.useMutation({
    onSuccess: async () => {
      await utils.cats.getAll.invalidate();
    },
  });

  if (catsQuery.isLoading) return <div>Loading...</div>;

  return (
    <div className="">
      <div className="flex justify-between">
        <div />
        <div>sort by name</div>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {catsQuery.data?.cats.map((cat) => {
          return (
            <div
              key={cat.id.toString()}
              className="max-h-80 rounded-md border border-gray-900 bg-gray-200 p-6"
            >
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
                  <div className="line-clamp line-clamp-5">{cat.bio}</div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex items-center justify-center">add cat</div>
      </div>
    </div>
  );
}
