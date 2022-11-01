import request, { get, post } from "@/utils/request";

export const getMetaConfig = (data) => get("/api/meta/config", data);

export const insertMetaItem = (data) => post("/api/meta/insert", data);

export const deleteMetaList = (data) => post("/api/meta/delete", data);

export const updateMetaItem = (data) => post("/api/meta/update", data);

export const selectMetaCount = (data) => post("/api/meta/count", data);

export const selectMetaList = (data) => post("/api/meta/list", data);

export const selectMetaTree = (data) => post("/api/meta/tree", data);

export const selectMetaItem = (data) => post("/api/meta/info", data);
