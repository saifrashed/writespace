import Head from "next/head";
import NavBar from "@/components/NavBar";
import Avatar from '@mui/material/Avatar';
import ScaledBadge from '@/components/badge-template/Badge';
import useUser from "@/lib/hooks/useUser";
import { useEffect, useState } from 'react';
import useAuthentication from "@/lib/hooks/useAuthentication";
import useBadges from "@/lib/hooks/useBadges";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * The profile page component.
 *
 * @component
 * @returns {JSX.Element} The rendered profile page.
 */
const Profile = () => {
  const { token } = useAuthentication();
  const { user, getUser, updateUserPicture } = useUser(token);
  const [isLegendary, setIslegendary] = useState<boolean>()
  const { badges } = useBadges(token)
  const [isProfilePictureUpdated, setIsProfilePictureUpdated] = useState(false);

  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsLargeScreen(window.innerWidth > 1600);
      setIsSmallScreen(window.innerWidth < 1000);
    };

    if (typeof window !== 'undefined') {
      setIsLargeScreen(window.innerWidth > 1600);
      setIsSmallScreen(window.innerWidth < 1000);
      window.addEventListener('resize', handleWindowResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleWindowResize);
      }
    };
  }, []);

  const carouselSettings = {
    infinite: true,
    speed: 500,
    autoplaySpeed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: isLargeScreen,  // Don't highlight the off-centered badge on small screens.
    focusOnSelect: true,
    accessibility: true,  // Allow control with arrow keys.
    centerPadding: "60px",
  };

  const carouselSettingsSmallScreen = {
    ...carouselSettings,
    slidesToShow: 3,
  };


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
      // Fetch updated user data
      getUser(token);
      // Reset the state
      setIsProfilePictureUpdated(false);
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
        <style>{`
          body {
            overflow-x: hidden;
          }
          .slick-slide {
            transform: scale(0.8);
            transition: all 0.4s ease-in-out;
            padding: 40px 0;
          }

          .slick-slide img {
            max-width: 100%;
            transition: all 0.4s ease-in-out;
          }

          .slick-center {
            transform: scale(1.1);
          }
        `}
        </style>
      </Head>
      <NavBar />

      <div className="mt-14 text-center pt-10 bg-gradient-to-br from-blue-50 to-purple-50">

        {/* Profile picture */}
        <div className="flex flex-col items-center justify-center mt-10 mb-10">
          <Avatar
            sx={{ width: 200, height: 200, border: '2px solid #706f7d', padding: '30px', boxShadow:'0px 0px 30px 2px purple'
          }}
            src={user?.pictureId === 0 || user?.pictureId === undefined ? '' : `/badges/${user?.pictureId}.png`}
          />
        </div>

        <div className="mx-16">
        {user && (
        <div className="grid grid-cols-3 gap-2 items-baseline mb-6">
          <div className={`text-start font-bold text-2xl font-medium ${isLegendary && "gradient-text"}`}>XP: {user.experiencePoints}</div>
          <div className={`text-center font-bold text-4xl font-medium ${isLegendary && "gradient-text"}`}>{user.name}</div>
          <div className={`text-end font-bold text-2xl font-medium ${isLegendary && "gradient-text"}`}>Level: {user.level}</div>
        </div>
        )}

          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            {user && (
              <div className="relative">
                <div
                  className="leading-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-sm font-medium text-center rounded-full"
                  style={{ height: "30px", width: `${Math.max((user.experiencePoints / user.threshold) * 100, 1)}%` }}>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-xl">
                      {`${user.experiencePoints} / ${user.threshold} XP`}
                    </div>
                  </div>
              </div>
            )}
          </div>
        </div>

        {/* Showcase carousel for achieved badges. */}
        {user &&
          <Slider {...(isSmallScreen ? carouselSettingsSmallScreen : carouselSettings)}>
            {[1].map(() => (
              badges.map((badge) => {
                const badgeCount = countBadgeOccurrences(badge.badgeId)
                const isBadgeOwned = user.badges.find(obj => obj.badgeId === badge.badgeId);

                if (!isBadgeOwned) { return null; }
                return (
                  <div className="flex justify-center">
                    <div
                      style={{
                        height: '300px', position: 'relative'
                        // top: '-10px', left: '35px',
                      }}
                      key={badge.badgeId}
                      >
                      <ScaledBadge
                        resizeFactor={0.8}
                        pictureUrl={`/badges/${badge.badgeId.toString()}.png`}
                        title={badge.name}
                        description={badge.description}
                        xp={String(badge.experiencePoints)}
                        unlocked={isBadgeOwned}
                        count={badgeCount}
                        onChooseProfilePicture={() => handleChooseProfilePicture(badge.badgeId)}
                        setIsProfilePictureUpdated={setIsProfilePictureUpdated}
                        noPopup={true}
                      />
                    </div>
                  </div>
                );
              })
            ))}
          </Slider>
        }

        <div className="mx-16">
          <h1 className="text-4xl pb-4 font-bold mb-6 gradient-text">Badges overview</h1>

          <div className={isSmallScreen ? '' : 'ml-16'}>
          {/* {isSmallScreen ? 'ml-4' : 'ml-16'} */}

            <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">

              {user &&
                badges.map((badge) => {
                  const badgeCount = countBadgeOccurrences(badge.badgeId)
                  const isBadgeOwned = user.badges.find(obj => obj.badgeId === badge.badgeId);

                  return (
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 flex items-center justify-center mb-44" key={badge.badgeId}>
                      <ScaledBadge
                        resizeFactor={0.5}
                        pictureUrl={`/badges/${badge.badgeId.toString()}.png`}
                        title={badge.name}
                        description={badge.description}
                        xp={String(badge.experiencePoints)}
                        unlocked={isBadgeOwned}
                        count={badgeCount}
                        onChooseProfilePicture={() => handleChooseProfilePicture(badge.badgeId)}
                        setIsProfilePictureUpdated={setIsProfilePictureUpdated}
                        noPopup={false}
                      />
                    </div>
                  );
                })
              }
            </div>
          </div>

      </div>
      </div>
    </>
  );
}

export default Profile;
