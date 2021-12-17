import styled, {keyframes} from "styled-components";
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

const anim = keyframes`
  0%{
    opacity: 0;
  }

  100%{
    opacity: 1;
  }
`

const ListItem = styled.li`
  animation: ${anim} 0.5s linear;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 20px;
  :hover{
    background: #d7e6f1;
  }
`

const Container = styled.div`
  flex: 1;
  padding-bottom: 40px;
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
