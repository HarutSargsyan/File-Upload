import { useEffect } from "react";
import styled from "styled-components";
import server from "utils/server";
import Item from "./Item";
import { FileI } from "./Upload";

interface Props {
  files: FileI[];
  setFiles(file: FileI[]): void;
}

const Text = styled.p`
  font-size: 1.25rem;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  flex: 1;
  padding: 40px 0;
  background-color: #fbfbfb;
  overflow-y: auto;
  height: 80%;
`;

export default ({ files, setFiles }: Props) => {
  const removeItem = async (name: string) => {
    const { data } = await server.delete(
      `${process.env.REACT_APP_SERVER_URL}/upload/${name}`
    );
    setFiles(files.filter((item) => data.name !== item.name));
  };

  return (
    <Container>
      {files.length ? (
        <List>
          {files.map((file, ind) => (
            <li key={ind}>
              <Item
                removeElem={() => {
                  removeItem(file.name);
                }}
                file={file}
              />
            </li>
          ))}
        </List>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Text>No files added </Text>
        </div>
      )}
    </Container>
  );
};
