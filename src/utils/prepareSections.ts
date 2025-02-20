import type {InitialListItemI, SectionItemI, SectionSpeakerI} from "@/types/sections.ts";
import {globalState} from "@/api/global.state.ts";

export const sectionKeysMap = {
    // "": "",
    "__1": "title",
    "__2": "time_start",
    "__3": "duration",
    "__4": "speakers",
    "__5": "speakers_photo",
    "__6": "event_type",
    "__7": "lang",
    "__8": "theme"
}

const preparedMap = {
    speakers: (el: { speakers: string }): Array<SectionSpeakerI> => {
        if (el?.speakers === '-' || !el?.speakers) return []
        return el?.speakers?.split(';')?.map((el: string) => {
            const [name, company] = el.split('/')
            return {name, company}
        })
    },
    time_start: (el: { time_start: string }): Date | null => {
        if (el.time_start) {
            const date = new Date();
            const currentDate = globalState.currentDate;
            const [h, m] = el.time_start.split(":")
            date.setHours(+h, +m, currentDate.getSeconds(), currentDate.getMilliseconds())
            return date
        }
        return null
    },
    time_end: (el: { time_start: Date, duration: string }): Date | null => {
        if (el.time_start) {
            const durationMs = +el.duration * 60000
            let endDate = new Date((el.time_start).getTime() + durationMs)
            return endDate
        }
        return null
    }
}

export function prepareSections(list: Array<InitialListItemI>): Array<SectionItemI> {
    const result = list.slice(1).map(initialItem => {
        const resultItem: any = {}

        Object.entries(sectionKeysMap)
            .forEach(([key, value]: [string, string]) => {
                    const field = initialItem?.[key as keyof InitialListItemI];

                    resultItem[value] = field === "-" ? null : field;
                    if (Object.keys(preparedMap).includes(value)) {
                        resultItem[value] = preparedMap[value as keyof typeof preparedMap](resultItem)
                    }
                }
            )
        if (!!resultItem?.time_start) {
            resultItem.time_end = preparedMap.time_end(resultItem)
        }

        return resultItem
    })

    return result
}