import request, { post } from "@/utils/request";

export const insertContentItem = (data) => post("/api/content/insert", data);

export const deleteContentList = (data) => post("/api/content/delete", data);

export const updateContentItem = (data) => post("/api/content/update", data);

export const selectContentCount = (data) => post("/api/content/count", data);

export const selectContentList = (data) => post("/api/content/list", data);

export const selectContentTree = (data) => post("/api/content/tree", data);

export const selectContentItem = (data) => post("/api/content/info", data);
