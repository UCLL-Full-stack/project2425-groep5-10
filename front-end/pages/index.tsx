import Head from "next/head";
import Link from "next/link";
import Header from "@/components/header";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <main className="p-6 bg-gradient-to-b from-gray-800 to-gray-600 min-h-screen items-center flex flex-col">
        <h1 className="text-4xl font-bold mb-8 text-white">Welcome to the Music App</h1>
        <div className="space-y-4">
          <Link href="/playlist/create">
            <p className="block bg-indigo-600 text-white p-4 rounded-lg shadow hover:bg-indigo-700">
              Create Playlist
            </p>
          </Link>
          <Link href="/song">
            <p className="block bg-indigo-600 text-white p-4 rounded-lg shadow hover:bg-indigo-700">
              View Songs
            </p>
          </Link>
          <Link href="/login">
            <p className="block bg-indigo-600 text-white p-4 rounded-lg shadow hover:bg-indigo-700">
              Login
            </p>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
