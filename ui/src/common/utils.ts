export function isFunctionExists(func: any): boolean
{
    return typeof func !== 'undefined'
}

export function isEmpty(obj: object) {
    return Object.keys(obj).length === 0;
}