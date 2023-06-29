import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { useNotification } from "./useNotification";
import { Badge, User, BadgeModel } from "../types";

// Custom React hook for managing user data
function useUser(token = '', assignmentId = '') {
  const [user, setUser] = useState<User>();
  const { onError } = useNotification()
  const [assignmentBadges, setAssignmentBadges] = useState<BadgeModel[]>();

  useEffect(() => {
    if (token) {
      getUser(token)
    }
  });

  useEffect(() => {
    if (assignmentId && token) {
      userAssignmentBadges(assignmentId, token)
    }
  }, [assignmentId, token]);

  // Retrieves user data
  const getUser = async (token: string) => {
    try {
      const response = await axios.get(`${config.baseUrl}/user/get-user`, { headers: { bearer: token } });
      setUser(response.data)
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  // Saves user data
  const saveUser = async (badges: Badge[], token: string) => {
    try {
      const response = await axios.post(`${config.baseUrl}/user/save`, { badges }, { headers: { bearer: token } });
      return response.data;
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  // Updates user picture
  const updateUserPicture = async (pictureId: number, token: string) => {
    try {
      const response = await axios.put(`${config.baseUrl}/user/update/picture`, { pictureId }, { headers: { bearer: token } });
      return response.data;
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  // Updates user experience points
  const updateUserExperiencePoints = async (experiencePoints: number, token: string) => {
    try {
      const response = await axios.put(`${config.baseUrl}/user/experience-points`, { experiencePoints }, { headers: { bearer: token } });
      return response.data;
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  // Adds badges to a user
  const addUserBadges = async (badges: number[], courseId: string, assignmentId: string, userId: string, comment: string, token: string) => {
    try {
      const response = await axios.put(`${config.baseUrl}/user/update/add-badges`, { badges, courseId, assignmentId, userId, comment }, { headers: { bearer: token } });
      return response.data;
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  // Retrieves assignment badges for a user
  const userAssignmentBadges = async (assignmentId: string, token: string) => {
    try {
      const response = await axios.post(`${config.baseUrl}/user/badges/assignment/`, { assignmentId }, { headers: { bearer: token } });
      setAssignmentBadges(response.data);
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  // Deletes a badge from a user
  const deleteUserBadge = async (assignmentId: number, badgeId: number, token: string) => {
    try {
      const response = await axios.put(`${config.baseUrl}/user/update/delete-badge`, { assignmentId, badgeId }, { headers: { bearer: token } });
      return response.data;
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  // Updates user data
  const updateUser = async (pictureId: number, experiencePoints: number, badges: Badge[], token: string) => {
    try {
      const response = await axios.put(`${config.baseUrl}/user/update`, { pictureId, experiencePoints, badges }, { headers: { bearer: token } });
      return response.data;
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  return { user, assignmentBadges, getUser, saveUser, updateUserPicture, updateUserExperiencePoints, addUserBadges, deleteUserBadge, updateUser };
}

export default useUser;
