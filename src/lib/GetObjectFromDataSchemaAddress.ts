export function GetObjectFromDataSchemaAddress(scope: string, data_schema: any) {
    if (scope === undefined || scope === null || data_schema === undefined || data_schema === null || scope === "") {
        return null
    }
    const keys = scope.split("/")
    keys.shift()

    let obj = data_schema
    keys.forEach((key) => {
        if (obj === undefined || obj === null) {
            return null
        }
        obj = obj[key]
    })
    return obj

}
