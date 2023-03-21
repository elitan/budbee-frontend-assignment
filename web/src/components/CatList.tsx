import { api } from "~/utils/api";
import { CatListItem } from "./CatListItem";
import { CatListAdd } from "./CatListAdd";

export function CatList() {
  const catsQuery = api.cats.getAll.useQuery();

  if (catsQuery.isLoading) return <div>Loading...</div>;

  return (
    <div className="">
      <div
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        data-testid="cat-list"
      >
        {catsQuery.data?.cats.map((cat) => {
          return (
            <CatListItem
              key={cat.id.toString()}
              cat={cat}
              data-testid="cat-list-item"
            />
          );
        })}
        <CatListAdd />
      </div>
    </div>
  );
}
