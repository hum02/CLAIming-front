import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledH1 = styled.h1`
  text-align: center;
  font-size: 24px;
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
  const [title, setTitle] = useState("문제에 사용되는 홀드를 모두 선택하세요.");
  useEffect(() => {
    if (submitCheck < 0) {
      if (pageIndex === 0) {
        setTitle("문제에 사용되는 홀드를 모두 선택하세요.");
      } else if (pageIndex === 1) {
        setTitle("스타트 홀드를 선택하세요.");
      } else if (pageIndex === 2) {
        setTitle("탑 홀드를 선택하세요.");
      }
    } else {
      setTitle("옆으로 넘겨가며 자세를 확인하세요.");
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
