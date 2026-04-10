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
