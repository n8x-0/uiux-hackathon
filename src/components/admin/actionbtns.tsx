"use client"

import { BiDownload } from "react-icons/bi"

const ActionBtns = ({data}: {data: string}) => {
    return (
        <div className="flex flex-col items-center gap-1">
            <button className="w-20 py-1 border-green-600 text-green-600 border font-medium text-sm cursor-not-allowed">Accept</button>
            <button className="w-20 py-1 border-blue-600 text-blue-600 border font-medium text-sm flex items-center justify-center gap-2"
                onClick={() => {
                    window.open(data, "_blank")
                }}
            ><BiDownload /> label</button>
            <button className="w-20 py-1 border-red-600 text-red-600 border font-medium text-sm cursor-not-allowed">cancel</button>
        </div>
    )
}

export default ActionBtns