import { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge } from "../types";


interface UserBadges {
    [key: number]: Badge;
}

function useBadges() {
    const [userBadges, setUserBadges] = useState<UserBadges>();


    const getBadges = async () => {
        try {
            const response = await axios.get('http://localhost:5000/user/findByUserId/1');
            setUserBadges(response.data[0].badges);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return { badges: userBadges, getBadges };
}

export default useBadges;