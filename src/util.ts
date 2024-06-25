export function includesSome(line: string, str: string[]) {
    // indexOf is faster than includes
    return str.some((s) => line.indexOf(s) !== -1);
}
export function includesEvery(line: string, str: string[]) {
    // indexOf is faster than includes
    return str.every((s) => line.indexOf(s) !== -1);
}