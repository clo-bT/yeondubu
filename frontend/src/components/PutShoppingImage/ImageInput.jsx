import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import PictureInput from '../../assets/PutShoppingImage/PictureInput.svg';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Container = styled.div`
overflow-y: auto;
margin-left: 20px;
margin-right: 20px;
margin-top: 20px;
margin-bottom: 110px;
height: auto;
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

const Brand = styled.p`
display: flex;
font-size: 10px;
height: 5px;
width: 10px;
padding: 10px 18px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 10px;
border: 1px solid #FF6565;
margin-top: 0px;
margin-bottom: 0px;

/* 배경색을 brandClickStates에 따라 조절 */
background-color: ${(props) =>
  props.isClicked ? '#FF5959' : 'transparent'};
color: ${(props) => (props.isClicked ? '#fff' : 'rgba(0, 0, 0, 0.80)')};
cursor: pointer;
`

const BrandBox = styled.div`
display: flex;
gap : 10px;
flex-wrap: wrap;
`

const ShoppingFilter = () => {
    // const filter_frame = {
    //     "category"    : "",
    //     "subcategory" : "",
    //     "min_price"   : 0,
    //     "max_price"   : 1000000000,
    //     "brand"       : [],
    //     "page"        : 1 
    // };
    const {category, subcategory} = useParams();
    const [brands, setBrands] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [currentPriceRange, setCurrentPriceRange] = useState(priceRange); // 현재 구간 값을 저장할 상태
    const [filterData, setFilter] = useState(filter_frame);
    
    useEffect(() => {
      const filterData = localStorage.getItem("filter_data");
      setFilter(filterData);
    }, []);

    useEffect(() => {
        const baseURL = 'http://localhost:5000'
        const URL = '/api/v1/marriage-stuffs/category_detail'
        const params = {
            category : category,
            subcategory : subcategory,
        }
        axios.get(baseURL + URL, {params})
            .then ((response) => {
                setBrands(response.data.brands.slice(1));
                const minPrice = parseFloat(response.data.min_price);
                const maxPrice = parseFloat(response.data.max_price);
                setPriceRange([minPrice, maxPrice]);
                handleSliderAfterChange([minPrice, maxPrice]);
            })
            .catch ((error) => {
                console.error('Error fetching default values:', error);
            });
    }, [category, subcategory]);
    
    // 브랜드 클릭 상태를 관리하는 배열
    const [brandClickStates, setBrandClickStates] = useState(
        new Array(brands.length).fill(false)
    );
      
    const handleSliderChange = (value) => {
        setCurrentPriceRange(value);
        // setPriceRange(value);
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

    // 클릭한 브랜드의 클릭 상태를 토글 
    const handleBrandClick = (index) => {
      const updatedClickStates = [...brandClickStates];
      updatedClickStates[index] = !updatedClickStates[index];
      setBrandClickStates(updatedClickStates);
      
      // 클릭한 브랜드 정보 배열 업데이트
      const clickedBrands = [];
      updatedClickStates.forEach((clicked, index) => {
        if (clicked) {
          clickedBrands.push(brands[index]);
        }
      });

      // 클릭한 브랜드 배열 출력
      console.log('클릭한 브랜드들:', clickedBrands);
    };
    
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   if (selectedImage) {
    //       const formData = new FormData();
    //       const data = {
    //           'category'    : 'furniture',
    //           'subcategory' : 'desk',
    //           'brand'       : '',
    //           'lprice'      : 150000,
    //           'hprice'      : 2000000,
    //           'count'       : 9,
    //       };
    //       formData.append('image', selectedImage);
    //       for (const key in data) {
    //         formData.append(key, data[key]);
    //       }
    //       try {
    //         const response = await axios.post('http://localhost:5000/api/v1/shopping_filter', formData, {
    //           headers: {
    //             'Content-Type': 'multipart/form-data',
    //           },
    //         });
    //         console.log('Upload success:', response.data);
    //     } catch (error) {
    //         console.error('Upload failed:', error);
    //     }
    //   }
    // };

    return (
        <Container>
            <Box>
                <GetOutButton href="/">나가기</GetOutButton>
                <EnterButton type="submit">적용하기</EnterButton>
            </Box>


        {/* <InputPicture
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
        /> */}
        <Box1>
        <Header>브랜드</Header>
        </Box1>

        <BrandBox>
        {brands.map((brand, index) => (
          <Brand
          key={brand}
          isClicked={brandClickStates[index]}
          onClick={() => handleBrandClick(index)}
          >{brand}</Brand>
        ))}
        </BrandBox>

        <Box1>
        <Header>가격대 설정</Header>

        <PriceRange>
          {currentPriceRange[0].toLocaleString()} - {currentPriceRange[1].toLocaleString()}원
        </PriceRange>

        </Box1>

        <PriceSliderContainer>
        <Slider
          range
          min={priceRange[0]}
          max={priceRange[1]}
          step={10000}
          defaultValue={priceRange}
          handle={CustomSliderHandle}
          dotStyle={{borderColor:'#c7ad92'}}
          trackStyle={{ backgroundColor: '#FFA8A899' }}
          handleStyle={{ backgroundColor: '#FFA8A899', borderColor:'#FFA8A899' }}
          // marks={{
          //   0: <span style={{ whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'right' }}>0</span>,
          //   5000000: <span style={{ whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'right' }}>50만원</span>,
          //   10000000: <span style={{ whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'right' }}>무제한</span>
          // }}
          onChange={handleSliderChange}
          onAfterChange={handleSliderAfterChange}
        />

      </PriceSliderContainer>
      </Container>
    );
};

export default ShoppingFilter;