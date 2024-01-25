import React,{ useCallback, useState } from "react";

const useInput = (initialValue:string) =>{
    const [value, setValue] = useState(initialValue); 
    const handler = useCallback(
      (
        e:
          | React.ChangeEvent<HTMLInputElement>
          | React.ChangeEvent<HTMLTextAreaElement>
      ) => {
        setValue(e.target.value);
      },
      [value]
    );
    return [value, handler, setValue] as const; 
}
export default useInput;