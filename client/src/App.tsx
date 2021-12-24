import { useState, lazy, Suspense } from "react";
import styled from "styled-components";
import Upload, { FileI } from "./components/Upload";
import ListItems from "components/ListItems";
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
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    min-width: 350px;
    height: 600px;
  }
  border-radius: 10px;
  padding: 10px;
  min-width: 700px;
  height: 500px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
`;

export default () => {
  const [files, setFiles] = useState<FileI[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  const getData = async () => {
    const { data } = await server.get("/upload");
    setIsLoaded(false);
    setFiles(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Upload files={files} setFiles={setFiles} />
        <ListItems isLoading={isLoaded} files={files} setFiles={setFiles} />
      </Container>
    </Wrapper>
  );
};
