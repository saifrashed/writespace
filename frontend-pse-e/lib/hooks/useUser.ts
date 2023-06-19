import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { useNotification } from "./useNotification";
import { Badge, User } from "../types";

function useUser() {
  const [user, setUser] = useState<User>();
  const { onSuccess, onError } = useNotification()

  const getUser = async (token: string) => {
    try {
        const response = await axios.get(`${config.baseUrl}/user/get-user`, { headers : { bearer: token }});
        setUser(response.data)
    } catch (error) {
        console.log(error)
        onError("Something went wrong")
    }
  }

  const saveUser = async (badges: Badge[], token: string) => {
    try {
        const response = await axios.post(`${config.baseUrl}/user/save`, {badges}, { headers : { bearer: token }});
        return response.data;
    } catch (error) {
        console.log(error)
        onError("Something went wrong")
    }
  }

  const updateUserPicture = async ( pictureId: number, token: string) => {
    try {
        const response = await axios.put(`${config.baseUrl}/user/update/picture`, {pictureId}, { headers : { bearer: token }});
        return response.data;
    } catch (error) {
        console.log(error)
        onError("Something went wrong")
    }
  }

  const updateUserExperiencePoints = async (experiencePoints:number, token: string) => {
    try {
        const response = await axios.put(`${config.baseUrl}/user/experience-points`, {experiencePoints}, { headers : { bearer: token }});
        return response.data;
    } catch (error) {
        console.log(error)
        onError("Something went wrong")
    }
  }

  const addUserBadge = async (badgeId: number, courseId: number, assignmentId: number, graderId: number, comment: string, token: string) => {
    try {
        const response = await axios.put(`${config.baseUrl}/user/update/add-badge`, {badgeId, courseId, assignmentId, graderId, comment}, { headers : { bearer: token }});
        return response.data;
    } catch (error) {
        console.log(error)
        onError("Something went wrong")
    }
  }

  const deleteUserBadge = async (assignmentId: number, badgeId: number, token: string) => {
    try {
        const response = await axios.put(`${config.baseUrl}/user/update/delete-badge`, {assignmentId, badgeId}, { headers : { bearer: token }});
        return response.data;
    } catch (error) {
        console.log(error)
        onError("Something went wrong")
    }
  }

  // is dit nodig ??
  const updateUser = async (pictureId: number, experiencePoints: number, badges: Badge[],token: string) => {
    try {
        const response = await axios.put(`${config.baseUrl}/user/update`, {pictureId, experiencePoints, badges}, { headers : { bearer: token }});
        return response.data;
    } catch (error) {
        console.log(error)
        onError("Something went wrong")
    }
  }


  return { user, getUser, saveUser, updateUserPicture, updateUserExperiencePoints, addUserBadge, deleteUserBadge ,updateUser};
}

export default useUser;