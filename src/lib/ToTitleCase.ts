export function ToTitleCase(str: string) {
    const no_underscore = str.replace(/_/g, " ")

    return no_underscore.replace(
        /\w\S*/g, (s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase()
    );
}

export function CamelCaseToTitleCase(s: string) {
    const result = s.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
}

export function ToDisplayString(str: string) {
    const de_camel = CamelCaseToTitleCase(str)
    return ToTitleCase(de_camel).trim().replaceAll("\t", " ").replaceAll("  ", " ")
}
