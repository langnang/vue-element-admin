import request, { post } from "@/utils/request";

export const selectLoggerList = (data) => post("/api/logger/list", data);
export const selectLoggerCount = (data) => post("/api/logger/count", data);
