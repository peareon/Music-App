import { useState, useContext } from "react";
import { ApiContext } from "@/app/page";

export default function Slider(){
    const {minValue, setMinValue, maxValue, setMaxValue} = useContext(ApiContext);

    const [minValueInput, setMinValueInput] = useState(35);
    const [maxValueInput, setMaxValueInput] = useState(46);

    function fromSlider(event) {
        let value = event.target.value;
        if(value < maxValue){
            setMinValue(Number(event.target.value));
            setMinValueInput(Number(event.target.value))
        }
        else{
            setMinValue(maxValue-5);
            setMinValueInput(maxValue-5);
            
        }}
    function toSlider(event) {
        if (event.target.value <= minValue){
            setMaxValue(minValue+5);
            setMaxValueInput(minValue+5);
        }
        else{
            setMaxValue(Number(event.target.value));
            setMaxValueInput(Number(event.target.value));
        }}

    function fromInput(event){
        if(event.target.value < maxValue){
            if(event.target.value <= 0){
                setMinValue(0);
                setMinValueInput(0);
            }
            else{
                setMinValue(Number(event.target.value));
                setMinValueInput(Number(event.target.value));
            } 
        }
        else{
            setMinValue(maxValue-5);
            setMinValueInput(maxValue-5);
        }
    }
    function toInput(event){
        if(event.target.value <= minValue){
            setMaxValue(minValue+5);
            setMaxValueInput(Number(event.target.value));
        }
        else{
            if(event.target.value >= 100){
                setMaxValue(100);
                setMaxValueInput(100);
            }
            else{
                setMaxValue(Number(event.target.value));
                setMaxValueInput(Number(event.target.value));
            }
        }
    }
    return(
        <>
            <div className="flex flex-col w-1/5 my-auto mx-auto mb-[150px]">
                <div className="relative min-h-[50px]">
                    <input className="h-[0px] z-[1]" id="fromSlider" type="range" value={minValue} min="0" max="100" onInput={(event) => fromSlider(event)}/>
                    <input className={`h-[2px]
                    ${maxValue <=0 ? "z-[2]": "z-0"}`} id="toSlider" type="range" value={maxValue} min="0" max="100" onInput={(event) => toSlider(event)}/>
                </div>
                <div className="relative flex justify-between text-[16px] text-[#232a2a]">
                    <div>
                        <div>Min Popularity</div>
                        <input type="number" id="fromInput" value={minValueInput} min="0" max="100" onInput={(event) => fromInput(event)}/>
                    </div>
                    <div>
                        <div>Max Popularity</div>
                        <input type="number" id="toInput" value={maxValueInput} min="0" max="100" onInput={(event) => toInput(event)}/>
                    </div>
                </div>
            </div>
        </>
    )
}