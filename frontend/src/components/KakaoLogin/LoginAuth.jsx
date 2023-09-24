import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import styled from 'styled-components';

const AuthPage = styled.div`
    
`
const Loading = styled.div``

const LoginAuth = () => {
    const [id, setid] = useState('');    
    const [c, setcode] = useState('')


    useEffect(() => {
        async function getid() {
            const code = new URL(window.location.href).searchParams.get("token");
            setcode(code)
            // window.location.href = 'http://localhost:3000/main'
            // try{        
            //     await axios.get(`${process.env.REACT_APP_API_ROOT}/login/oauth2/code/kakao?code=${code}`)
            //     .then(function(r){
            //         alert(r.data.message)
            //         if(r.data.code === 2001){ // 로그인 성공 시
            //             // setuserinfo(r.data.data.member);
            //             sessionStorage.setItem("isAuthorized", "true")
            //             sessionStorage.setItem("member",JSON.stringify(r.data.data.member))
		    //             sessionStorage.setItem("eventSource",new EventSource(
            //                 `${process.env.REACT_APP_API_ROOT}/notification/subscribe/${r.data.data.member.id}`
            //             ));
                        
            //             window.location.href = process.env.REACT_APP_HOME_URL
            //         }

            //         else if(r.data.code === 2002 || r.data.code === 2003){ // 회원가입 성공 시
            //             setid(r.data.data.id)
            //         }
            //         else if(r.data.code === 2101 || r.data.code === 2201 || r.data.code === 2202 ){
            //             window.location.href = `${process.env.REACT_APP_HOME_URL}/main`
            //         }
            //         else{alert('warning')}
            //     })
            // }
            // catch(error){
            //     console.error('Error fetching data:', error);
            // }
        }
        getid()
    },[])
    return (
        <AuthPage>
            <Loading>
                토큰 :  {c}
                {id ? <div>uuid : {id}</div> : ''}
                <br/>로딩중
            </Loading>
        </AuthPage>
    );
};

export default LoginAuth;
