
export const ICON_NOT_FOUND = 1
export const ICON_SVG_PARSING_ERROR = 2

const messages: {[index: string]:any} = {}
messages[ICON_NOT_FOUND] = 'Icon not found'
messages[ICON_SVG_PARSING_ERROR] = 'Icon SVG parsing error'

export const MSG = messages;
