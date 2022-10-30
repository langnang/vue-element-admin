import request, { post } from "@/utils/request";

export const selectLoggerList = (data) => post("/api/logger/list", data);
