import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledH1 = styled.h1`
  text-align: center;
  margin-top: 50px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledH2 = styled.div`
  color: gray;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const TitleArea = ({ pageIndex, submitCheck }) => {
  const [title, setTitle] = useState("Select hold page");
  useEffect(() => {
    if (submitCheck < 0) {
      if (pageIndex === 1) {
        setTitle("Select start hold");
      } else if (pageIndex === 2) {
        setTitle("Select top Hold");
      }
    } else {
      setTitle("Result Page");
    }
  }, [pageIndex, submitCheck]);

  return (
    <StyledContainer>
      <StyledH1>{title}</StyledH1>
      {submitCheck < 0 ? <StyledH2>{pageIndex + 1}/3</StyledH2> : <></>}
    </StyledContainer>
  );
};

export default TitleArea;
