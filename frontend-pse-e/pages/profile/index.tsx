import Head from "next/head";
import NavBar from "@/components/NavBar";
import Avatar from '@mui/material/Avatar';
import badges from '../../data/badges';
import ScaledBadge from '@/components/badge-template/Badge';
import useUser from "@/lib/hooks/useUser";
import { useEffect } from 'react';
import useAuthentication from "@/lib/hooks/useAuthentication";


const Profile = () => {
  const { token } = useAuthentication();
  const { user, getUser, addUserBadges} = useUser(token);

  // let a = 0;
  // if(a == 0) {

  //   a++;
  // }

  // useEffect(() => {
  //   console.log(user);
  //   if (user) {
  //     console.log(user);
  //     addUserBadges([4, 6], 78232, 1, 301010, "wow zo goed",token);
  //     con
  //   }

  // }, [user])


  function countBadgeOccurrences(targetBadgeId:number) {
    let count = 0;
    if (user) {
      for (const badge of user?.badges) {
        if (badge.badgeId === targetBadgeId) {
          count++;
        }
      }
    }

    return count;
  }

  // useEffect(() => {
  //   if (user){
  //     getUser(token);
  //   }
  // }, [user])

  // useEffect(() => {
  //   if (user) {
  //     console.log(user);
  //   }

  // }, [])


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
        <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-8 md:w-1/5 md:h-[100vh] flex items-start content-center justify-center overflow-y-auto">

          <div className="flex flex-col items-center justify-center mt-20">
            <Avatar
              sx={{ width: 150, height: 150, border: '3px solid #706f7d' }}
              src= { user?.pictureId === 0 || user?.pictureId === undefined ? '' : `/badges/${user?.pictureId}.png`}
            />
            <div className="mt-4 text-center font-bold text-xl">{user?.name}</div>
            {user && (
              <div>
                <div className="mt-4 text-center font-bold"> Level {user.level}</div>
                <div className="mt-4 text-center font-bold"> XP {user.experiencePoints}</div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full relative shadow-md sm:p-2 md:p-4 lg:p-8 md:w-4/5 overflow-x-hidden">

          <div className="flex flex-col mt-20 justify-center items-center">
            {/* <ProgressBar bgcolor="orange" progress="30" height={35} /> */}
          </div>

          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            {user && (
              <div>
                <div
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ height: "20px", width: `${user.experiencePoints / user.threshold * 100}%` }}
                >
                  {/* <span className="h-full flex items-center justify-center">{`${user.experiencePoints / 50} XP`}</span> */}
                </div>
              </div>
            )}
          </div>
          {user && (<div> {`${user.experiencePoints / 50} / ${user.threshold} XP`}</div>)}
          <p className="mt-20 mb-8 text-2xl font-bold flex justify-center sm:mt-10 sm:mb-4 md:text-2xl">Badges</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">

            {user &&
              badges.map((badge) => {
                const badgeCount = countBadgeOccurrences(badge.id)
                const isBadgeOwned = badgeCount !== 0
                return (
                  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 flex items-center justify-center mb-36" key={badge.id}>
                    <ScaledBadge
                      resizeFactor={0.5}
                      pictureUrl={`/badges/${badge.id.toString()}.png`}
                      title={badge.title}
                      description={badge.description}
                      commentary={'no comment'}
                      xp={String(badge.exp)}
                      unlocked={isBadgeOwned}
                      count = {badgeCount}
                    />
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