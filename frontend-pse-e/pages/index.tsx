import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar"
import Link from 'next/link';

const Home = () => {
  return (
    <>
      <Head>
        <title>WriteSpace</title>
        <meta name="description" content="Writing. Fun, Intuitive." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <div className="relative">
        <section className="bg-white overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-stretch lg:min-h-[800px]">
            <div className="relative flex items-center justify-center w-full lg:order-2 lg:w-7/12">
              <div className="absolute bottom-0 right-0 hidden lg:block">
                <img className="object-contain w-auto h-48" src="./curved-lines.png" alt="" />
              </div>

              <div className="relative px-4 pt-24 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:py-24 lg:text-left">
                <h1 className="text-4xl font-bold text-black sm:text-6xl xl:text-8xl">
                  Writing.<br />
                  Fun, Intuitive.
                </h1>
                <p className="mt-8 text-xl text-black">We help you to make your remote work life easier. Build a distruction free working experience.</p>

                <div className=" sm:bg-white sm:border-2 sm:border-transparent sm:rounded-full ">
                  <div className="flex flex-col items-center md:flex-row">
                    <Link href={"/courses"}>
                      <button type="submit" className="inline-flex items-center justify-center w-full rounded-2xl px-4 py-4 mt-8 font-bold text-white transition-all duration-200 bg-orange-500 border border-transparent sm:w-auto hover:bg-orange-600 focus:bg-orange-600">
                        Go to your courses
                      </button>
                    </Link>
                  </div>
                </div>
                <p className="mt-5 text-base text-black">Login with your university</p>
              </div>
            </div>

            <div className="relative w-full overflow-hidden lg:order-1 h-96 md:min-h-screen lg:h-auto lg:w-5/12">
              <div className="absolute inset-0">
                <img className="object-cover w-full h-full scale-150" src="/home.png" alt="" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

              <div className="absolute bottom-0 left-0">
                <div className="p-4 sm:p-6 lg:p-8">
                  <p className="max-w-xs mt-1.5 text-xl text-white">Join others and learn to write better.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>




    </>
  );
};

export default Home;
