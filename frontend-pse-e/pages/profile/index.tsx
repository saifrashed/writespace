import Head from "next/head";
import NavBar from "@/components/NavBar";
import Avatar from '@mui/material/Avatar';
import ProgressBar from '@/components/ExpBrainBar';
import badges from '../../data/badges';
import ScaledBadge from '@/components/badge-template/Badge';
import useBadges from "@/lib/hooks/useBadges";


import { useEffect } from 'react';

const Profile = () => {
    const { badges: userBadges, getBadges } = useBadges();

    useEffect(() => {
      getBadges();
    }, [])
    console.log(userBadges);

    return (
        <>
          <Head>
            <title>Profile page</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <NavBar />

        <div className="flex h-screen">
          <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-8 md:w-1/5 md:h-[100vh] flex items-center content-center justify-center overflow-y-auto">
            <div className="flex justify-center">
            <Avatar
            sx={{ width: 150, height: 150 }}
            alt="henk">H</Avatar>
            </div>
          </div>

          <div className="w-full relative shadow-md sm:p-2 md:p-4 lg:p-8 md:w-4/5 overflow-x-hidden">
              <div className="flex flex-col">
                <ProgressBar bgcolor="orange" progress="30" height={30} />
              </div>

              <div className="flex flex-wrap justify-center">
                {userBadges &&
                  badges.map((badge) => {
                    const isBadgeOwned = userBadges.hasOwnProperty(badge.id);
                    return (
                      <div className="m-10 flex items-center justify-center h-24 w-24" key={badge.id}>
                        <ScaledBadge resizeFactor={0.5} pictureUrl={`/badges/${badge.id.toString()}.png`} />
                      </div>
                    );
                  })}
              </div>
          </div>
        </div>

        </>
    );

}

export default Profile;