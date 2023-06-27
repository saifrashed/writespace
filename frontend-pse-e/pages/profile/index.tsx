import Head from "next/head";
import NavBar from "@/components/NavBar";
import Avatar from '@mui/material/Avatar';
import ScaledBadge from '@/components/badge-template/Badge';
import useUser from "@/lib/hooks/useUser";
import { useEffect, useState } from 'react';
import useAuthentication from "@/lib/hooks/useAuthentication";
import useBadges from "@/lib/hooks/useBadges";

const Profile = () => {
  const { token } = useAuthentication();
  const { user, getUser, updateUserPicture } = useUser(token);
  const [isLegendary, setIslegendary] = useState<boolean>()
  const { badges } = useBadges(token)
  const [isProfilePictureUpdated, setIsProfilePictureUpdated] = useState(false);

  function countBadgeOccurrences(targetBadgeId: number) {
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

  useEffect(() => {
    if (user) {
      setIslegendary(user && user.level >= 100)
    }
  }, [user])

  useEffect(() => {
    if (isProfilePictureUpdated) {
      getUser(token); // Fetch updated user data
      setIsProfilePictureUpdated(false); // Reset the state
    }
  }, [isProfilePictureUpdated, getUser, token]);

  const handleChooseProfilePicture = async (badgeId: number) => {
    await updateUserPicture(badgeId, token);
  };

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
              src={user?.pictureId === 0 || user?.pictureId === undefined ? '' : `/badges/${user?.pictureId}.png`}
            />
            <div className={`mt-4 text-center font-bold text-3xl ${isLegendary && "gradient-text"}`}>{user?.name}</div>
            {user && (
              <div className="lg:flex lg:row lg:justify-between lg:w-full">
                <div className={`mt-4 lg:me-1 text-center font-bold text-xl ${isLegendary && "gradient-text"}`}> XP {user.experiencePoints}</div>
                <div className={`mt-4 lg:ms-1 text-center font-bold text-xl ${isLegendary && "gradient-text"}`}> Level {user.level}</div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full relative shadow-md sm:p-2 md:p-4 lg:p-8 md:w-4/5 overflow-x-hidden">

          <div className="mt-20 w-full bg-gray-200 rounded-full dark:bg-gray-700">
            {user && (
              <div>
                <div
                  className="leading-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-sm font-medium text-center p-0.5 rounded-full"
                  style={{ height: "20px", width: `${user.experiencePoints / user.threshold * 100}%` }}
                >

                  <div className="absolute w-full">{user && (`${user.experiencePoints} / ${user.threshold} XP`)}</div>
                </div>
              </div>
            )}
          </div>

          <p className="mt-20 mb-8 text-2xl font-bold flex justify-center sm:mt-10 sm:mb-4 md:text-2xl">Badges</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">

            {user &&
              badges.map((badge) => {
                const badgeCount = countBadgeOccurrences(badge.badgeId)
                const isBadgeOwned = user.badges.find(obj => obj.badgeId === badge.badgeId);

                return (
                  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 flex items-center justify-center mb-36" key={badge.badgeId}>
                    <ScaledBadge
                      resizeFactor={0.5}
                      pictureUrl={`/badges/${badge.badgeId.toString()}.png`}
                      title={badge.name}
                      description={badge.description}
                      commentary={'no comment'}
                      xp={String(badge.experiencePoints)}
                      unlocked={isBadgeOwned}
                      count={badgeCount}
                      onChooseProfilePicture={() => handleChooseProfilePicture(badge.badgeId)}
                      setIsProfilePictureUpdated={setIsProfilePictureUpdated}
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
