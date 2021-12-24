import styled, { keyframes } from "styled-components";
import server from "utils/server";
import Item from "./Item";
import { FileI } from "./Upload";

interface Props {
  files: FileI[];
  setFiles(file: FileI[]): void;
  isLoading: boolean;
}

const Text = styled.p`
  font-size: 1.25rem;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const anim = keyframes`
  0%{
    opacity: 0;
  }

  100%{
    opacity: 1;
  }
`;

const NoFileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ListItem = styled.li`
  animation: ${anim} 0.5s linear;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 20px;
  :hover {
    background: #d7e6f1;
  }
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #2f80ec;
  width: 24px;
  height: 24px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: ${spin} 0.5s linear infinite;
`;

const Container = styled.div`
  flex: 1;
  padding-bottom: 40px;
  background-color: #fbfbfb;
  overflow-y: auto;
  height: 90%;
`;

export default ({ files, setFiles, isLoading }: Props) => {
  const removeItem = async (name: string) => {
    const processedFiles = files.map((file) => {
      if (file.name === name) {
        file.isRemoving = true;
      }
      return file;
    });
    setFiles(processedFiles);
    const { data } = await server.delete(
      `${process.env.REACT_APP_SERVER_URL}/upload/${name}`
    );
    setFiles(files.filter((item) => data.name !== item.name));
  };

  if (isLoading) {
    return (
      <Container>
        <NoFileContainer>
          <Spinner />
        </NoFileContainer>
      </Container>
    );
  }

  return (
    <Container>
      {files.length ? (
        <List>
          {files.map((file, ind) => (
            <ListItem key={ind}>
              <Item
                removeElem={() => {
                  removeItem(file.name);
                }}
                file={file}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <NoFileContainer>
          <Text>No files added </Text>
        </NoFileContainer>
      )}
    </Container>
  );
};
