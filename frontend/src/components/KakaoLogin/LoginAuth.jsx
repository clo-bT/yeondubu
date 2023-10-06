import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPage = styled.div`
    
`
const Loading = styled.div``

const LoginAuth = () => {
    const [c, setcode] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        async function getid() {
            const accessToken = new URL(window.location.href).searchParams.get("token");
            setcode(accessToken)
            if (accessToken) {
                localStorage.setItem("token", accessToken);
                // window.location.replace(`${process.env.REACT_APP_HOME_URL}/`);
                axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/users`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        
                    },
                })
                    .then((response) => {
                        if (response.data.is_couple===false) {
                            window.location.replace(`${process.env.REACT_APP_HOME_URL}/invite`);
                        }
                        else {
                            window.location.replace(`${process.env.REACT_APP_HOME_URL}/`);
                            
                        }
                    })
                // try{        
                //     await axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/users`, {
                //         headers: {
                //             Authorization: `Bearer ${accessToken}`,

                //         },
                //     })
                //         .then((response)=> {
                //         console.log(response.data.name)
                //         localStorage.setItem("id", response.data.id);
                //         localStorage.setItem("name", response.data.name);
                //         localStorage.setItem("image", response.data.image_url);
                //         // if (response.data.is_couple) {
                //         //     window.location.replace(`${process.env.REACT_APP_HOME_URL}/`);
                //         // }
                //         // else if(!response.data.is_couple) {
                //         //     window.location.replace(`${process.env.REACT_APP_HOME_URL}/invite`);
                //         // }
                //         // if(r.data.code === 200){ // 로그인 성공 시
                //         //     // setuserinfo(r.data.data.member);
                //         //     sessionStorage.setItem("isAuthorized", "true")
                //         //     sessionStorage.setItem("id",JSON.stringify(r.data.id))
                //         //     sessionStorage.setItem("name",JSON.stringify(r.data.name));
                //         //     // sessionStorage.setItem("imageUrl",JSON.stringify(r.data.imageUrl));
                //         //     sessionStorage.setItem("userRole",JSON.stringify(r.data.userRole));
                //         //     sessionStorage.setItem("creditScore",JSON.stringify(r.data.creditScore));
                        
                //         //     window.location.href = process.env.REACT_APP_HOME_URL
                //         // }

                //         // else if(r.data.code === 2002 || r.data.code === 2003){ // 회원가입 성공 시
                //         //     setid(r.data.data.id)
                //         // }
                //         // else if(r.data.code === 2101 || r.data.code === 2201 || r.data.code === 2202 ){
                //         //     window.location.href = `${process.env.REACT_APP_HOME_URL}/main`
                //         // }
                //         // else{alert('warning')}
                //     })
                // }
                // catch(error){
                //     console.error('Error fetching data:', error);
                // }
            }
        }
            getid()
    },[])
    return (
        <AuthPage>
            <Loading>
                {/* 토큰 :  {c} */}
                <br/>로딩중..
            </Loading>
        </AuthPage>
    );
};

export default LoginAuth;
