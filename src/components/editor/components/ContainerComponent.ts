import {Component, ReactNode} from "react";
import {IContainerNode} from "@/components/editor/components/INode.tsx";

export class ContainerComponent extends Component implements IContainerNode {

    children: ReactNode[] = []
    id: string = ""

}
