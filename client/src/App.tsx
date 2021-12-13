import { useState } from "react";
import styled from "styled-components";
import Upload, { FileI } from "./components/Upload";
import ListItems from "./components/ListItems";
import { useEffect } from "react";
import server from "utils/server";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2f80ec;
`;

const Container = styled.div`
  border-radius: 10px;
  padding: 10px;
  width: 800px;
  height: 500px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
`;

export default () => {
  const [files, setFiles] = useState<FileI[]>([]);

  const getData = async () => {
    const { data } = await server.get("/upload");
    setFiles(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Upload files={files} setFiles={setFiles} />
        <ListItems files={files} setFiles={setFiles} />
      </Container>
    </Wrapper>
  );
};
