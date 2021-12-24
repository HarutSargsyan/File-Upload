import { useState } from "react";
import { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Spinner } from "./ListItems";
import { ReactComponent as Uplaod } from "../assets/upload.svg";
import DeleteImage from "assets/close-button.png";
import server from "../utils/server";

const Browse = styled.button`
  background-color: #2f80ec;
  padding: 10px 80px;
  border-radius: 5px;
  color: white;
  font: 1.25rem sans-serif;
  margin-top: 40px;
  border: none;
  cursor: pointer;
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const anim = keyframes`
  0%{
    transform: translateY(0);
  }
  50%{
    transform: translateY(20px);
  }
  100%{
    transform: translateY(0);
  }
`;

interface IconProps {
  isstop: string;
}

const StyledIcon = styled(Uplaod)<IconProps>`
  cursor: pointer;
  animation: ${anim} 1s infinite;
  animation-play-state: ${(props) =>
    props.isstop == "true" ? "paused" : "running"};
`;

export interface FileI {
  name: string;
  size: number;
  type: string;
  src: string;
  isRemoving?: boolean;
}

interface Props {
  files: FileI[];
  setFiles(file: FileI[]): void;
}

export default ({ setFiles, files }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);

  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFile(e.target.files && e?.target?.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (file) {
      const fileNames = files.map((file) => file.name);
      if (fileNames.includes(file.name)) {
        setError("File exists with the same name");
        setFile(null);
        return;
      }
      setFile(null);
      setIsPending(true);
      const formData = new FormData();
      formData.append("photo", file);
      const { data } = await server.post("/upload", formData);
      const type = data.type;
      if (!type) {
        setError("File type isn't supported");
        return;
      }
      data.type = type.split("/")[1];
      setFiles([data, ...files]);
      setIsPending(false);
    } else {
      setError("No file selected");
    }
  };

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        ref={ref}
        multiple
        style={{ opacity: 0, width: 0, height: 0 }}
        type="file"
        onChange={handleChange}
      />

      <StyledIcon
        isstop={`${!!file}`}
        onClick={() => {
          ref.current?.click();
        }}
      />
      <Browse type="submit">Submit</Browse>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {file?.name && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <p>{file?.name}</p>
          <img
            onClick={() => {
              setFile(null);
            }}
            style={{ marginLeft: "10px", cursor: "pointer" }}
            width="20px"
            height="20px"
            src={DeleteImage}
            alt="Close-icon"
          />
        </div>
      )}
      {isPending && <Spinner style={{ marginTop: "20px" }} />}
    </Form>
  );
};
