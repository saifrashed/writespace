import { useState, useEffect } from 'react';
import axios from 'axios';
// import { Badge } from "../types";
import { UserDb } from "../types";

// interface UserBadges {
//     [key: number]: Badge;
// }

// function useBadges() {
//     const [userBadges, setUserBadges] = useState<UserBadges>();

//     const getBadges = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/user/findByUserId/1');
//             setUserBadges(response.data[0]);

//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     return { badges: userBadges, getBadges };
// }

// export default useBadges;

function useDbUser() {
    const [userData, setUserData] = useState<UserDb>();

    const getDbUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/user/find-by-user-id/1');
            setUserData(response.data);
        } catch(error) {
            console.error('Error fetching data:', error);
        }
    };

    return {userData, getDbUser};
}

export default useDbUser;