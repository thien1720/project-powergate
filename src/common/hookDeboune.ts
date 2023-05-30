import {useState, useEffect} from "react"

function useDeboune(value : string, delay?: number){
    const [debouneValue, setDebouneValue] = useState<string>(value)

    useEffect(()=>{
        const handlers = setTimeout(() => {
            setDebouneValue(value)    
        }, delay);

        return() => {
            clearTimeout(handlers);
          };
    },[value])

    return debouneValue
}

export default useDeboune