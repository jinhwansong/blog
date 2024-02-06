import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { categore } from "redux/reducers/post";
import { usePagination } from "hooks";
import * as St from "./style";



const Categore = ()=>{
    const router = useRouter()
    const param = useParams()
    
    const dispatch = useDispatch<AppDispatch>()
    const { categore: name } = useSelector((state: RootState) => state.post);
    
    const onCategore = useCallback((name: string, totalItems: number) => {
      const { currentPage } = usePagination({ totalItems });
      router.push(`/categore=${name}&page=${currentPage}`);
    }, []);
    useEffect(()=>{
      dispatch(categore());
    },[])
    
    return (
      <St.Categore>
        {name.map((v) => (
          <St.CategoreLi
            onClick={() => onCategore(v.categore, v.count)}
            $color={param.name === v.categore}
            key={v.id}
          >
            <p>{v.categore}</p>
            <span>{v.count}</span>
          </St.CategoreLi>
        ))}
      </St.Categore>
    );
}
export default Categore;