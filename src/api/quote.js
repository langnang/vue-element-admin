import request, { post } from "@/utils/request";

export const insertQuoteItem = (data) => post("/api/quote/insert", data);

export const deleteQuoteList = (data) => post("/api/quote/delete", data);

export const updateQuoteItem = (data) => post("/api/quote/update", data);

export const selectQuoteCount = (data) => post("/api/quote/count", data);

export const selectQuoteList = (data) => post("/api/quote/list", data);

export const selectQuoteTree = (data) => post("/api/quote/tree", data);

export const selectQuoteItem = (data) => post("/api/quote/info", data);
