import { api } from "~/utils/api";
import { CatListItem } from "./CatListItem";
import { CatListAdd } from "./CatListAdd";

export function CatList() {
  const catsQuery = api.cats.getAll.useQuery();

  if (catsQuery.isLoading) return <div>Loading...</div>;

  return (
    <div className="">
      <div className="flex justify-between">
        <div />
        <div>sort by name (todo)</div>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {catsQuery.data?.cats.map((cat) => {
          return <CatListItem key={cat.id.toString()} cat={cat} />;
        })}
        <CatListAdd />
      </div>
    </div>
  );
}
