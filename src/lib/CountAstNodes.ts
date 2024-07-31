import {IAst} from "@/types/IAst.tsx";

export function CountAstNodes(ast: IAst, current: number) {
    let count = current;
    count++
    if (ast != null) {
        ast.children.forEach((value) => {
            count++
            if (value != undefined) {
                count += CountAstNodes(value, current)
            }
        })
    }

    return count;
}
