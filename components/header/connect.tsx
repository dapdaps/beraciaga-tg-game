import Modal from "../modal"
import { useState } from "react"

const Connect = () => {
    const [isSoundOn, setIsSoundOn] = useState(true)
    const [open, setOpen] = useState(false)
    
    const handleSwitch = () => {
        setIsSoundOn(!isSoundOn)
    }
    
    return (
        <Modal open={open} onClose={() => setOpen(false)} isShowCloseIcon={false}>
            <div className="w-[220px] h-[227px] bg-[#FFFAEA] border-2 border-[#D7C69D] rounded-2xl">
                <div className="w-full h-full relative p-2">
                    <div className="flex items-center gap-2">
                        <img src="/images/coin.png" className="w-[36px] h-[36px] rounded-full" alt="" />
                        <div className="font-cherryBomb text-[26px] leading-[26px] text-white text-stroke-2">@berabro</div>
                    </div>
                    <svg className="mt-3" width="204" height="2" viewBox="0 0 204 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="1" y1="1" x2="203" y2="1" stroke="#7F6D41" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 4"/>
                    </svg>
                    <div className="flex items-center mt-4 justify-between">
                        <div className="font-cherryBomb text-stroke-2 text-white leading-[18px] text-[18px]">Connected with</div>
                        <img src="/svg/okx.svg" className="w-6 h-6" alt="" />
                    </div>
                    <div className="flex items-center mt-[15px] justify-between">
                        <div className="font-cherryBomb text-stroke-2 text-white leading-[18px] text-[18px]">Sound</div>
                        <img 
                            onClick={handleSwitch} 
                            src={isSoundOn ? "/svg/switch-on.svg" : "/svg/switch-off.svg"} 
                            className="w-[48px] h-[26px] cursor-pointer" 
                            alt="sound switch" 
                        />
                    </div>
                    <div className="flex justify-center mt-[18px]">
                        <img src="/svg/button-quit.svg" alt="" />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default Connect