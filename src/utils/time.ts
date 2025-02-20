export const getHoursMin = (date: Date | string | null) => {
    if (date) {
        return (date as Date).toLocaleTimeString().substr(0, 5)
    }
    return ''
}

export const getDay = (date: Date | string | null): string => {
    const daysMap = {
        1: 'Пн',
        2: 'Вт',
        3: 'Ср',
        4: 'Чт',
        5: 'Пт',
        6: 'Cб',
        0: 'Вс',
    }
    if (!date) return ''
    const dayKey: string | number = (date as Date)?.getDay()
    return daysMap?.[(+dayKey) as keyof typeof daysMap] || ''
}

type GetHoursMinSecT = (time: Date | string | null | number) => {
    hours: number,
    minutes: number,
    seconds: number
} | null

export const getHoursMinSec: GetHoursMinSecT = (time) => {
    if (!time) return null

    const handlingTime = typeof time === "number" ? time : new Date(time).getTime()

    let remainingSeconds = Math.floor((handlingTime as number) / 1000); // в секундах
    let hours = Math.floor(remainingSeconds / 3600); // в часах
    let minutes = Math.floor((remainingSeconds % 3600) / 60);

    return {hours, minutes, seconds: remainingSeconds}
}

export const getDifference = (end: Date | string | null, start: Date | string | null) => {
    if (!end || !start) return ""

    let remainingTime = (end as Date).getTime() - (start as Date).getTime();

    if (remainingTime <= 0) {
        return null;
    }

    return getHoursMinSec(remainingTime)
}