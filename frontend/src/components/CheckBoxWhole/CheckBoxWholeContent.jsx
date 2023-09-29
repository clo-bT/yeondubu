import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap; 
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`
const Box = styled.div`
display: flex;
justify-content: flex-end;
gap: 12px;    
margin-right: 20px;

`
const AddButton = styled.a`
color: #000;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;    
    
`
const EditButton = styled.a`
color: #000;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;    

`
const TagBox = styled.div`
border-radius: 10px;
border: 2px solid #FFA8A8;
background: rgba(255, 255, 255, 0.50);
display: flex;
width: 83px;
height: 83px;
padding: 14px 8px;
flex-direction: column;
justify-content: center;
align-items: center;

`;
const FirstTag = styled.p`
color: #000;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;   

`
const SecondTag = styled.p`
color: rgba(0, 0, 0, 0.50);
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;


`

const SecondTagItem = styled.span`
margin-right:3px;   
`
const CheckBoxWholeContent = () => {
    const dummyData = [
        {
          id: 1,
          firstTag: '혼수',
          secondTag: ['가구', '가전', '기타']
        },
        {
          id: 2,
          firstTag: '신혼집',
          secondTag: ['집']
        },
        {
          id: 3,
          firstTag: '결혼식',
          secondTag: ['스드메', '예식장', '기타']
        },
        {
          id: 4,
          firstTag: '신혼여행',
          secondTag: ['항공비', '숙소비']
        },
        {
          id: 5,
          firstTag: '기타',
          secondTag: []
        }
      ];
      
    return (
        <div>
            <Box>
            <AddButton>추가</AddButton>
            <EditButton>편집</EditButton>
            </Box>
        <Container>
        {dummyData.map((item) => (
        <TagBox key={item.id}>
          <FirstTag>{item.firstTag}</FirstTag>
          <SecondTag>
            {item.secondTag.map((tag, index) => (
              <SecondTagItem key={index}>{tag}</SecondTagItem>
            ))}
          </SecondTag>
        </TagBox>
      ))}

        </Container>

    </div>
        );
        };

export default CheckBoxWholeContent;