import request, { post } from "@/utils/request";

export const insertCommentItem = (data) => post("/api/comment/insert", data);

export const deleteCommentList = (data) => post("/api/comment/delete", data);

export const updateCommentItem = (data) => post("/api/comment/update", data);

export const selectCommentCount = (data) => post("/api/comment/count", data);

export const selectCommentList = (data) => post("/api/comment/list", data);

export const selectCommentTree = (data) => post("/api/comment/tree", data);

export const selectCommentItem = (data) => post("/api/comment/info", data);
