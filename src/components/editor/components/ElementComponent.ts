import {Component} from "react";
import {INode} from "@/components/editor/components/INode.tsx";

export class ElementComponent extends Component implements INode {

    id: string;

    constructor(props:any) {
        super(props);
        this.id = props.id;
    }



}
