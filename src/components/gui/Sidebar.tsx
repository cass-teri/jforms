import {PiSquareSplitHorizontal, PiSquareSplitVertical, PiStepsBold} from "react-icons/pi";
import {LuTextCursorInput} from "react-icons/lu";
import {FaRegCalendarAlt} from "react-icons/fa";
import React from "react";
import {AiOutlineGroup} from "react-icons/ai";
import {FaLayerGroup} from "react-icons/fa6";

export function Sidebar(){


    const button_style = "w-14 h-14 flex justify-center items-center bg-neutral-700 text-white rounded-md";
    const icon_style = "w-10 h-10";

    const OnDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
        e.dataTransfer.clearData();
        e.dataTransfer.setData("text", e.currentTarget.id);
    }


    return <>
        <aside className="bg-neutral-600 fixed left-0 top-16 bottom-16 w-32 justify-start items-center py-8" >

            <div className="grid grid-cols-2 grid-flow-dense gap-1">
                <button draggable className={button_style} id="VerticalLayout" onDragStart={OnDragStart} title="Vertical Layout" >
                    <PiSquareSplitVertical  className={icon_style}/>
                </button>

                <button draggable className={button_style} id="HorizontalLayout" onDragStart={OnDragStart} title="Horizontal Layout">
                    <PiSquareSplitHorizontal className={icon_style}/>
                </button>

                <button draggable className={button_style} id="Group" onDragStart={OnDragStart} title="Group">
                    <AiOutlineGroup className={icon_style}/>
                </button>

                <button draggable className={button_style} id="Repeater" onDragStart={OnDragStart} title="Repeater">
                    <FaLayerGroup className={icon_style}/>
                </button>

                <button draggable className={button_style} id="Stepper" onDragStart={OnDragStart} title="Stepper">
                    <PiStepsBold className={icon_style}/>
                </button>
            </div>

            <hr className="w-full my-4 border-neutral-500" />

            <div className="grid grid-cols-2 grid-flow-dense gap-1">
                <button draggable className={button_style} id="Text" onDragStart={OnDragStart} title="Text">
                    <LuTextCursorInput className={icon_style}/>
                </button>

                <button draggable className={button_style} id="Date" onDragStart={OnDragStart} title="Date">
                    <FaRegCalendarAlt  className={icon_style}/>
                </button>

                <button draggable className={button_style} id="Integer" onDragStart={OnDragStart} title="Integer">
                    <PiSquareSplitHorizontal  className={icon_style}/>
                </button>
            </div>
        </aside>
    </>
}
