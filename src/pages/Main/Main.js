import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Header,
  LogoBox,
  Logo,
  LogoName,
  Body,
  NewChat,
  PlusImg,
  Description,
} from "./style";

import ChatList from "../../components/ChatList/ChatList";

const Main = () => {
  const navigate = useNavigate();

  const cameraHandler = () => {
    navigate("/camera");
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/getData`
        );
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header>
        <LogoBox>
          <Logo />
          <LogoName>이게모약</LogoName>
        </LogoBox>
      </Header>
      <Body>
        <NewChat onClick={cameraHandler}>
          <PlusImg />
          <Description>새로운 알약 검색</Description>
        </NewChat>
        {data.map((item, index) => (
          <ChatList key={index} item={item} />
        ))}
      </Body>
    </>
  );
};

export default Main;
