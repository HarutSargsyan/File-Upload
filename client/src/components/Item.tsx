import { ReactComponent as Delete } from "../assets/delete.svg";
import styled from "styled-components";
import { FileI } from "./Upload";
import { formatName, formatType, sizeToMb } from "../utils/functions";
import { ReactComponent as CloseIcon } from "../assets/cancel.svg";
import { useState } from "react";

interface Props {
  file: FileI;
  removeElem(): void;
}

const DeleteIcon = styled(Delete)`
  margin-top: 8px;
  cursor: pointer;
`;

const Avatar = styled.span`
  margin-right: 20px;
  border-radius: 50%;
  border: 1px solid#2F80EC;
  width: 50px;
  aspect-ratio: 1/1;
  background-color: #d7e6f1;
  font: 200 normal 1.3rem;
  color: #2f80ec;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-right: 25px;
`;

const Text = styled.p`
  margin: 0;
  font: normal 600 1rem;
  color: #000000;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

const ShowWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const SecondaryText = styled.p`
  margin: 0;
  color: #808080;
  font: 200 normal 0.8rem;
`;

export default ({ file, removeElem }: Props) => {
  

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Item onClick={() => setIsModalOpen(true)}>
        <ContentContainer>
          <Avatar>{formatType(file.type)}</Avatar>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text>{formatName(file.name)}</Text>
            <SecondaryText>{sizeToMb(file.size)} MB</SecondaryText>
          </div>
        </ContentContainer>
        <DeleteIcon
          onClick={(e) => {
            e.stopPropagation();
            removeElem();
          }}
        />
      </Item>
      {isModalOpen && (
        <ShowWrapper>
          <img style={{ maxHeight: "600px" }} src={file.src} alt="image" />
          <CloseIcon
            onClick={() => {
              setIsModalOpen(false);
            }}
            style={{
              position: "absolute",
              top: "40px",
              right: "40px",
              cursor: "pointer",
            }}
          />
        </ShowWrapper>
      )}
    </>
  );
};
