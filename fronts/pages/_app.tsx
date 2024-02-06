import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "style/GlobalStyle";
import { lightTheme, darkTheme } from "style/Theme";
import { Button } from "components";
import wrapper from "redux/store";

import { IoIosSunny, IoIosMoon } from "react-icons/io";

interface AppProps{
    Component:NextPage
}

const app = ({Component, ...rest}:AppProps)=>{
    const { store } = wrapper.useWrappedStore(rest);
    
    const [theme, setTheme] = useState("light");
    useEffect(() => {
      const CurrentTheme = localStorage.getItem("theme");
      setTheme(CurrentTheme || "light");
    }, []);
    const changeTheme = useCallback(() => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    }, [theme]);

    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <title>진환이 포폴</title>
        </Head>
        <Provider store={store}>
          <ThemeProvider theme={theme === "light" ? darkTheme : lightTheme}>
            <GlobalStyle />
            <Component />
            <Button
              onButton={changeTheme}
              themes="themes"
              image={theme === "light" ? <IoIosMoon /> : <IoIosSunny />}
            >
              {theme === "light" ? "다크모드" : "라이트모드"}
            </Button>
          </ThemeProvider>
        </Provider>
      </>
    );
}
export default app;