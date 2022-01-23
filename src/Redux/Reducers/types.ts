export interface ACTION {
    type: string
    payload: any
}

export interface QUESTION{
    id: number
    firstLangText: string[]
    firstLangWord: string
    secondLangText: string[]
    secondLangWord: string
    options: string[]
}