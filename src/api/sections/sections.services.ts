import {http} from "@/api/axios.config.ts";

export default {
    getSectionById(id: string, signal: AbortSignal) {
        return http.get(`/report_${id}.json`, {signal});
    }
}