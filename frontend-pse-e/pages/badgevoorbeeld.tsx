import React from 'react';
import ScaledBadge from '@/components/badge-template/Badge';

const Home = () => {
  const thisStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const badgeContainerStyle = {
    display: 'flex',
    marginRight: '150px',
  };

  const smallScreenBadgeContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '150px',
  };

  const badgeNumbers = [1, 2, 3, 5, 6, 7, 8];
  const badgeUrls = badgeNumbers.map((number) => `/badges/${number.toString()}.png`);

  return (
    <>
      <h1 className="text-3xl mb-4">Badge voorbeeld</h1>
      <div style={thisStyle}>
        {badgeUrls.map((url, index) => (
          <div style={badgeContainerStyle} key={index}>
            <ScaledBadge resizeFactor={0.6} pictureUrl={url} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
