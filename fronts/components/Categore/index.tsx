import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import * as St from "./style";


const Categore = ()=>{
    const router = useRouter()
    const params = useParams()
    const onCategore = useCallback(()=>{
        router.push("/")
    },[])
    return (
      <St.Categore>
        <St.CategoreLi onClick={onCategore} $color>
          <p>제목스</p>
          <span>12</span>
        </St.CategoreLi>
        <St.CategoreLi onClick={onCategore} $color>
          <p>제목스</p>
          <span>12</span>
        </St.CategoreLi>
      </St.Categore>
    );
}
export default Categore;