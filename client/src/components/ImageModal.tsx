import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../assets/cancel.svg";

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

const CloseButton = styled(CloseIcon)`
  position: absolute;
  top: 40px;
  right: 40px;
  cursor: pointer;
`;

export default ({
  src,
  setIsModalOpen,
}: {
  src: string;
  setIsModalOpen(isOpen: boolean): void;
}) => (
  <ShowWrapper>
    <img style={{ maxHeight: "600px" }} src={src} alt="image" />
    <CloseButton
      onClick={() => {
        setIsModalOpen(false);
      }}
    />
  </ShowWrapper>
);
