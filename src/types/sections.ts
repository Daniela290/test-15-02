// Интерфейс, где ключи соответствуют ключам из sectionKeysMap, а значения - строки
export interface InitialListItemI {
    "": string;
    "__1": string;
    "__2": string;
    "__3": string;
    "__4": string;
    "__5": string;
    "__6": string;
    "__7": string;
    "__8": string;
}

export interface SectionSpeakerI {
    name: string;
    company: string
}

export interface SectionItemI {
    title: string;
    time_start: Date | null;
    time_end?: Date | null;
    duration: string;
    speakers: Array<SectionSpeakerI> | [];
    speakers_photo: string | null;
    event_type: string | null;
    lang: string | null;
    theme: string | null;
}
