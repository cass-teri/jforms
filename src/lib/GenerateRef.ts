import { IAst } from "@/types/IAst.tsx"

export function GenerateRef(parent: IAst | string, acc: string) {
    if (typeof parent === "string") {
        return parent + acc
    }
    const new_acc = "/" + parent.id + acc
    if (parent.parent != null) {
        return GenerateRef(parent.parent, new_acc)
    } else return new_acc
}
