import { SchemaPackage } from "@/types/SchemaPackage.tsx"

export interface IAst {
    id: string
    SchemaPackage: SchemaPackage
    children: IAst[]
    parent?: IAst | string | null | undefined
    type: string
}
