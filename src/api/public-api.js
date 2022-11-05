import request, { post } from "@/utils/request";

export const insertPublicApiItem = (data) => post("/api/public-api/insert", data);

export const deletePublicApiList = (data) => post("/api/public-api/delete", data);

export const updatePublicApiItem = (data) => post("/api/public-api/update", data);

export const selectPublicApiCount = (data) => post("/api/public-api/count", data);

export const selectPublicApiList = (data) => post("/api/public-api/list", data);

export const selectPublicApiTree = (data) => post("/api/public-api/tree", data);

export const selectPublicApiItem = (data) => post("/api/public-api/info", data);
