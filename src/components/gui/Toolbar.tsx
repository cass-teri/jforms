import {
    PiListBulletsBold,
    PiNumberSquareOneLight,
    PiPhoneDisconnect,
    PiSquareSplitHorizontal,
    PiSquareSplitVertical,
} from "react-icons/pi";
import {LuTextCursorInput} from "react-icons/lu";
import {FaRegCalendarAlt} from "react-icons/fa";
import React from "react";
import {AiOutlineGroup} from "react-icons/ai";
import {FaLandmark, FaRegSquareCheck} from "react-icons/fa6";
import {useDragging} from "@/components/context/DragContextProvider.tsx";
import {TbDecimal} from "react-icons/tb";
import {BsPostcard, BsTextareaResize} from "react-icons/bs";
import {MdOutlineAlternateEmail, MdOutlineLandscape} from "react-icons/md";
import {VscSymbolBoolean} from "react-icons/vsc";
import {ImParagraphLeft} from "react-icons/im";
import {IoMdRadioButtonOn} from "react-icons/io";
import {RiDropdownList} from "react-icons/ri";

export function Toolbar() {
    const button_style = "w-12 h-12 flex justify-center items-center bg-neutral-700 text-white rounded-md";
    const icon_style = "w-8 h-8";
    const {SetDraggingContext} = useDragging()

    const OnDragStart = (e: React.DragEvent<HTMLButtonElement>) => {

        SetDraggingContext({
            is_dragging: true,
            id: e.currentTarget.id,
            dragging_type: "button",
        })

    }

    return <>
        <aside
            className="bg-neutral-700 fixed left-0 top-16 bottom-0 w-28 justify-start items-center pt-4 overflow-auto">

            <div className="grid grid-cols-2 grid-flow-dense gap-1">
                <button draggable className={button_style} id="VerticalLayout" onDragStart={OnDragStart}
                        title="Vertical Layout">
                    <PiSquareSplitVertical className={icon_style}/>
                </button>

                <button draggable className={button_style} id="HorizontalLayout" onDragStart={OnDragStart}
                        title="Horizontal Layout">
                    <PiSquareSplitHorizontal className={icon_style}/>
                </button>

                <button draggable className={button_style} id="Group" onDragStart={OnDragStart} title="Group">
                    <AiOutlineGroup className={icon_style}/>
                </button>
                {/*

                <button draggable className={button_style} id="Repeater" onDragStart={OnDragStart} title="Repeater">
                    <FaLayerGroup className={icon_style}/>
                </button>

                <button draggable className={button_style} id="Stepper" onDragStart={OnDragStart} title="Stepper">
                    <PiStepsBold className={icon_style}/>
                </button>

                <button draggable className={button_style} id="Category" onDragStart={OnDragStart} title="Category">
                    <IoDocumentsOutline className={icon_style}/>
                </button>
*/}

            </div>

            <hr className="w-full my-2 border-neutral-500"/>

            <div className="grid grid-cols-2 grid-flow-dense gap-1">
                <button draggable className={button_style} id="Text" onDragStart={OnDragStart} title="Text">
                    <LuTextCursorInput className={icon_style}/>
                </button>

                <button draggable className={button_style} id="Textarea" onDragStart={OnDragStart} title="Textarea">
                    <BsTextareaResize className={icon_style}/>
                </button>

                <button draggable className={button_style} id="Date" onDragStart={OnDragStart} title="Date">
                    <FaRegCalendarAlt className={icon_style}/>
                </button>

                <button draggable className={button_style} id="Integer" onDragStart={OnDragStart} title="Integer">
                    <PiNumberSquareOneLight className={icon_style}/>
                </button>

                <button draggable className={button_style} id="Number" onDragStart={OnDragStart} title="Number">
                    <TbDecimal className={icon_style}/>
                </button>

                <button draggable className={button_style} id="PostalCode" onDragStart={OnDragStart}
                        title="Postal Code">
                    <BsPostcard className={icon_style}/>
                </button>

                <button draggable className={button_style} id="Phone" onDragStart={OnDragStart} title="Phone">
                    <PiPhoneDisconnect className={icon_style}/>
                </button>

                <button draggable className={button_style} id="Email" onDragStart={OnDragStart} title="Email">
                    <MdOutlineAlternateEmail className={icon_style}/>
                </button>

            </div>

            <hr className="w-full my-2 border-neutral-500"/>

            <div className="grid grid-cols-2 grid-flow-dense gap-1">
                <button draggable className={button_style} id="Boolean" onDragStart={OnDragStart} title="Boolean">
                    <VscSymbolBoolean className={icon_style}/>
                </button>


                <button draggable className={button_style} id="DropDown" onDragStart={OnDragStart} title="DropDown">
                    <RiDropdownList className={icon_style}/>
                </button>

                <button draggable className={button_style} id="Radio" onDragStart={OnDragStart} title="Radio">
                    <IoMdRadioButtonOn className={icon_style}/>
                </button>


                <button draggable className={button_style} id="Checkbox" onDragStart={OnDragStart} title="Checkbox">
                    <FaRegSquareCheck className={icon_style}/>
                </button>

                <button draggable className={button_style} id="Province" onDragStart={OnDragStart} title="Province">
                    <MdOutlineLandscape className={icon_style}/>
                </button>

                <button draggable className={button_style} id="Ministry" onDragStart={OnDragStart} title="Ministry">
                    <FaLandmark className={icon_style}/>
                </button>

            </div>

            <hr className="w-full my-2 border-neutral-500"/>

            <div className="grid grid-cols-2 grid-flow-dense gap-1">
                <button draggable className={button_style} id="Header" onDragStart={OnDragStart} title="Header">
                    <h1 className="text-2xl font-extrabold text-white">H</h1>
                </button>

                <button draggable className={button_style} id="SubHeader" onDragStart={OnDragStart} title="Sub Header">
                    <h2 className={`text-xl font-bold text-white`}>H</h2>
                </button>

                <button draggable className={button_style} id="Paragraph" onDragStart={OnDragStart} title="Paragraph">
                    <ImParagraphLeft className={icon_style}/>
                </button>

                <button draggable className={button_style} id="Bullets" onDragStart={OnDragStart} title="Bullets">
                    <PiListBulletsBold className={icon_style}/>
                </button>
                {/*

                <button draggable className={button_style} id="Details" onDragStart={OnDragStart} title="Details">
                    <AiOutlineDownSquare className={icon_style} />
                </button>

                <button draggable className={button_style} id="Image" onDragStart={OnDragStart} title="Image">
                    <FaImage className={icon_style} />
                </button>

                <button draggable className={button_style} id="Link" onDragStart={OnDragStart} title="Link">
                    <TbWorldWww className={icon_style} />
                </button>

*/}


            </div>

        </aside>
    </>
}
