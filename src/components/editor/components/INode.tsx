import {ReactNode} from "react";
import {JsonSchema7} from "@jsonforms/core";


export interface INode extends JsonSchema7{

    id: string

}

export interface IContainerNode extends INode {

        children: ReactNode[]

}
