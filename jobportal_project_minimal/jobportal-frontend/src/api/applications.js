// src/api/applications.js
import api from "./api";

export const getEmployerApplications = async () => {
    const res = await api.get("/applications");
    return res.data;
};

export const updateApplicationStatus = async (id, status) => {
    const res = await api.put(`/applications/${id}`, { status });
    return res.data;
};

export const updateApplicationNotes = async (id, notes) => {
    const res = await api.put(`/applications/${id}`, { notes });
    return res.data;
};

export const updateApplicationRating = async (id, rating) => {
    const res = await api.put(`/applications/${id}`, { rating });
    return res.data;
};

// Combined update if needed
export const updateApplication = async (id, data) => {
    const res = await api.put(`/applications/${id}`, data);
    return res.data;
};
