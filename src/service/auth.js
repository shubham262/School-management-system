import { useCallback } from "react";
import api from "./index";

export const register = async (payload) => {
	try {
		const { data } = await api.post("/auth/register", payload);
		return data;
	} catch (error) {
		throw error;
	}
};

export const fetchSchoolInformation = async (slug) => {
	try {
		const { data } = await api.get(`/school/${slug}/school-information`);
		return data;
	} catch (error) {
		throw error;
	}
};

export const updateSchoolInformation = async (slug, payload) => {
	try {
		const { data } = await api.put(
			`/school/${slug}/update-school-information`,
			payload
		);
		return data;
	} catch (error) {
		throw error;
	}
};

export const fetchSchoolAnnouncements = async (slug, query = false) => {
	try {
		const { data } = await api.get(
			`/announcement/${slug}/fetch-school-announcement?all=${query}`
		);
		return data;
	} catch (error) {
		throw error;
	}
};

export const login = async (slug, payload) => {
	try {
		const { data } = await api.post(`/auth/${slug}/sign-in`, payload);
		return data;
	} catch (error) {
		throw error;
	}
};

export const updateUserInformation = async (slug, payload) => {
	try {
		const { data } = await api.put(
			`/auth/${slug}/updateUserInformation`,
			payload
		);
		return data;
	} catch (error) {
		throw error;
	}
};

export const deleteAnnouncements = async (slug, annoucementId) => {
	try {
		const { data } = await api.delete(
			`/announcement/${slug}/deleteAnnouncement/${annoucementId}`
		);
		return data;
	} catch (error) {
		throw error;
	}
};

export const createAnnouncements = async (slug, payload) => {
	try {
		const { data } = await api.post(
			`/announcement/${slug}/create-school-announcement`,
			payload
		);
		return data;
	} catch (error) {
		throw error;
	}
};

export const updateAnnouncements = async (slug, annoucementId, payload) => {
	try {
		const { data } = await api.put(
			`/announcement/${slug}/update-announcement/${annoucementId}`,
			payload
		);
		return data;
	} catch (error) {
		throw error;
	}
};

export const createUsersinBulk = async (slug, payload) => {
	try {
		const { data } = await api.post(`/auth/${slug}/add-bulk-user`, payload);
		return data;
	} catch (error) {
		throw error;
	}
};

export const fetchSchoolStudents = async (
	slug,
	page = 1,
	limit = 10,
	query = "",
	studentClass = ""
) => {
	try {
		const { data } = await api.get(
			`/auth/${slug}/fetch-all-students?page=${page}&limit=${limit}&query=${query}&studentClass=${studentClass}`
		);
		return data;
	} catch (error) {
		throw error;
	}
};

export const fetchSchoolTeachers = async (
	slug,
	page = 1,
	limit = 10,
	query = "",
	classFilter = "",
	subjectsFilter = ""
) => {
	try {
		const { data } = await api.get(
			`/auth/${slug}/fetch-all-teachers?page=${page}&limit=${limit}&query=${query}&classFilter=${classFilter}&subjectsFilter=${subjectsFilter}`
		);
		return data;
	} catch (error) {
		throw error;
	}
};

export const removeUsersFromSchool = async (slug, userId) => {
	try {
		const { data } = await api.delete(
			`/auth/${slug}/remove-user-from-school/${userId}`
		);
		return data;
	} catch (error) {
		throw error;
	}
};

export const updatePassword = async (slug, payload) => {
	try {
		const { data } = await api.put(`/auth/${slug}/change-password`, payload);
		return data;
	} catch (error) {
		throw error;
	}
};

export const getUserInformation = async (slug) => {
	try {
		const { data } = await api.get(`/auth/${slug}/fetchUserInformation`);
		return data;
	} catch (error) {
		throw error;
	}
};

export const fetchUser = async () => {
	try {
		const { data } = await api.get(`/auth/fetchUser`);
		return data;
	} catch (error) {
		throw error;
	}
};

export const createNewSchool = async () => {
	try {
		const { data } = await api.post("/auth/register-fresh");
		return data;
	} catch (error) {
		throw error;
	}
};

export const fetchStudentsAttendence = async (
	slug,
	date = "",
	studentClass = ""
) => {
	try {
		const { data } = await api.get(
			`/auth/${slug}/fetch-students-attendence?date=${date}&studentClass=${studentClass}`
		);
		return data;
	} catch (error) {
		throw error;
	}
};

export const saveAttendence = async (slug, payload) => {
	try {
		const { data } = await api.post(
			`/auth/${slug}/save-students-attendence`,
			payload
		);
		return data;
	} catch (error) {
		throw error;
	}
};
