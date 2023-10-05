import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import PictureInput from '../../assets/PutShoppingImage/PictureInput.svg';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


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
  const navigate = useNavigate();
    const {category, subcategory} = useParams();
    const [brands, setBrands] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [currentPriceRange, setCurrentPriceRange] = useState([0, 1000]); // 현재 구간 값을 저장할 상태
    const [filterData, setFilterData] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);

    useEffect(() => {
      const defaultData = {
        lprice : 0,
        hprice : 1000000000,
        brand : ''
      };
      // let storedData = JSON.parse(localStorage.getItem(subcategory));
      let storedData = JSON.parse(localStorage.getItem(subcategory));
      console.log(storedData);
      if (!storedData) {
        localStorage.setItem(subcategory, JSON.stringify(defaultData));
        storedData = defaultData;
      };
      setFilterData(storedData);
    }, [subcategory]);  

    useEffect(() => {
        const baseURL = `${process.env.REACT_APP_FLASK_ROOT}`
        // const baseURL = 'http://j9a307.p.ssafy.io:5000'
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

    const handleSliderAfterChange = (value) => {
        setCurrentPriceRange(value);
        console.log('슬라이더 구간 값:', value);
    };
            // 이미지를 선택했을 때 처리하는 함수
      const handleImageSelect = (event) => {
          const file = event.target.files[0]; // 선택한 파일
          if (file) {
              const imageUrl = URL.createObjectURL(file); // 파일의 URL 생성
              setSelectedImage(imageUrl); // 선택한 이미지를 상태에 저장
              setUploadImage(event.target.files[0])
          }
    };

    const CustomSliderHandle = Slider.Handle;
    

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
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const updatedClickStates = [...brandClickStates];
      const clickedBrands = [];
      updatedClickStates.forEach((clicked, index) => {
        if (clicked) {
          clickedBrands.push(brands[index]);
        }
      });
      const ArrayToString = clickedBrands.join(', ');
      let newFilterData = {
          brand  : ArrayToString,
          lprice : currentPriceRange[0],
          hprice : currentPriceRange[1],
      };
      localStorage.setItem(subcategory, JSON.stringify(newFilterData));
      if (selectedImage) {
          const formData = new FormData();
          const data = {
              'category'    : category,
              'subcategory' : subcategory,
              'brand'       : ArrayToString,
              'lprice'      : currentPriceRange[0],
              'hprice'      : currentPriceRange[1],
          };
          console.log(uploadImage);
          formData.append('image', uploadImage);
          for (const key in data) {
            formData.append(key, data[key]);
          }
          try {
            axios.post(`${process.env.REACT_APP_FLASK_ROOT}/api/v1/marriage-stuffs/img_search`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then (res => {
              localStorage.setItem('img_search', JSON.stringify(res.data));
              navigate(`/shoppingrecommendation/${category}/${subcategory}`)
            })
            .catch(err => {
              console.log(err)
            })
        } catch (error) {
            console.error('Upload failed:', error);
        }
      } else {
        navigate(`/shoppingmall/${category}/${subcategory}`);
      }
    };

    return (
        <Container>
            <Box>
                <GetOutButton onClick={()=>navigate(`/shoppingmall/${category}/${subcategory}`)}>나가기</GetOutButton>
                <EnterButton type="submit" onClick={handleSubmit} onSubmit={handleSubmit}>적용하기</EnterButton>
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