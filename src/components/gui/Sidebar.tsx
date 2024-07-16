import {PiSquareSplitHorizontal, PiSquareSplitVertical} from "react-icons/pi";
import {LuTextCursorInput} from "react-icons/lu";
import {FaRegCalendarAlt} from "react-icons/fa";
import React from "react";

export function Sidebar(){


    const button_style = "w-12 h-12 flex justify-center items-center bg-primary text-white rounded-md";
    const icon_style = "w-10 h-10";

    const OnDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
        e.dataTransfer.clearData();
        e.dataTransfer.setData("text", e.currentTarget.id);
    }


    return <aside
        className="bg-primary fixed left-0 top-16 bottom-16 w-16 flex flex-col justify-start items-center py-8"
    >
        <button draggable className={button_style} id="vertical"
            onDragStart={OnDragStart}>
            <PiSquareSplitVertical  className={icon_style}/>
        </button>
        <button draggable className={button_style} id="horizontal"
            onDragStart={OnDragStart}
        >
            <PiSquareSplitHorizontal className={icon_style}/>
        </button>
        <hr className="w-1/2 my-4 border-neutral-900" />
        <button draggable className={button_style} id="text"
            onDragStart={OnDragStart}
        >
            <LuTextCursorInput className={icon_style}/>
        </button>
        <button draggable className={button_style} id="calendar" onDragStart={OnDragStart}>
            <FaRegCalendarAlt  className={icon_style}/>
        </button>


    </aside>
}
