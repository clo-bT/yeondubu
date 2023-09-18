import {React, useState} from 'react';
import styled from 'styled-components';
import PictureInput from '../../assets/PutShoppingImage/PictureInput.svg';
import { AiFillPlusCircle } from "react-icons/ai";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Container = styled.div`
overflow-y: auto;
margin-left: 20px;
margin-right: 20px;
margin-top: 20px;
margin-bottom: 30px;
`
const GetOutButton = styled.a`
color: #000;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-decoration: none;

`

const EnterButton = styled.a`
color: #FF5959;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: normal;   

`
const Box = styled.div`
display: flex;
justify-content : space-between ;
margin-bottom: 30px;
`
const Box1 = styled.div`
display: flex;
justify-content : space-between ;
/* margin-bottom: 20px; */

`
const InputPicture = styled.img`
width: 250px;
height: 250px;
border-radius: 10px;
cursor: pointer; 
display: block; 
margin: 0 auto;
`

const Header = styled.p`
color: rgba(0, 0, 0, 0.80);
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: normal;    
`
const PlusIcon = styled(AiFillPlusCircle)`
margin-left: 5px;
fill: rgba(255, 147, 125, 0.30);
color: #000;

`

const PriceSliderContainer = styled.div`
  padding: 20px;
  border-radius: 10px;

`;

const PriceRange = styled.p`
color: #FF5959;
text-align: right;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
`

const ShoppingFilter = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [currentPriceRange, setCurrentPriceRange] = useState(priceRange); // 현재 구간 값을 저장할 상태
  const handleSliderChange = (value) => {
    setPriceRange(value);
    const scrollPosition = (value[0] / 1000) * document.documentElement.scrollHeight;
    window.scrollTo(0, scrollPosition);
  };
    // 이미지를 선택했을 때 처리하는 함수
    const handleImageSelect = (event) => {
    const file = event.target.files[0]; // 선택한 파일
    if (file) {
        const imageUrl = URL.createObjectURL(file); // 파일의 URL 생성
        setSelectedImage(imageUrl); // 선택한 이미지를 상태에 저장
    }
    };

    const CustomSliderHandle = Slider.Handle;
    
    const handleSliderAfterChange = (value) => {
        setCurrentPriceRange(value);
        console.log('슬라이더 구간 값:', value);
    };
    return (
        <Container>
            <Box>
                <GetOutButton href="/">나가기</GetOutButton>
                <EnterButton>적용하기</EnterButton>
            </Box>


        <InputPicture
          src={selectedImage || PictureInput}
          alt="Uploaded Image"
          onClick={() => document.getElementById('imageInput').click()} 
        />
        <input
          type="file"
          id="imageInput"
          accept="image/*" 
          style={{ display: 'none' }} 
          
          onChange={handleImageSelect} 
        />
        <Box1>
        <Header>브랜드<PlusIcon /></Header>
        </Box1>

        <Box1>
        <Header>가격대 설정</Header>
        <PriceRange>
          {currentPriceRange[0].toLocaleString()} - {currentPriceRange[1].toLocaleString()}원
        </PriceRange>

        </Box1>

        <PriceSliderContainer>
        <Slider
          range
          min={0}
          max={10000000}
          step={100000}
          defaultValue={priceRange}
          handle={CustomSliderHandle}
          dotStyle={{borderColor:'#c7ad92'}}
          trackStyle={{ backgroundColor: '#FFA8A899' }}
          handleStyle={{ backgroundColor: '#FFA8A899', borderColor:'#FFA8A899' }}
          marks={{
            0: <span style={{ whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'right' }}>0</span>,
            5000000: <span style={{ whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'right' }}>50만원</span>,
            10000000: <span style={{ whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'right' }}>무제한</span>
          }}
          onChange={handleSliderChange}
          onAfterChange={handleSliderAfterChange}
        />

      </PriceSliderContainer>
        </Container>
    );
};

export default ShoppingFilter;