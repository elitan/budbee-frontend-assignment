import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { CatList } from "~/components/CatList";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Furry Friends</title>
      </Head>
      <div className="py-12">
        <div>
          <div className="text-3xl">Furry Friends</div>
        </div>
        <div className="my-8">
          <CatList />
        </div>
      </div>
    </>
  );
};

export default Home;
