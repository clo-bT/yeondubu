import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import styled from 'styled-components';


const LoginAuth = () => {
    const [id, setid] = useState('');    
    const [c, setcode] = useState('')


    useEffect(() => {
        async function getid() {
            const code = new URL(window.location.href).searchParams.get("code");
            setcode(code)
            window.location.href = 'http://localhost:3000/auth'
            
            try{        
                await axios.get(`${process.env.REACT_APP_API_ROOT}/member/login?code=${code}`)
                .then(function(r){
                    alert(r.data.message)
                    if(r.data.code === 2001){ // 로그인 성공 시
                        // setuserinfo(r.data.data.member);
                        sessionStorage.setItem("isAuthorized", "true")
                        sessionStorage.setItem("member",JSON.stringify(r.data.data.member))
		                sessionStorage.setItem("eventSource",new EventSource(
                            `${process.env.REACT_APP_API_ROOT}/notification/subscribe/${r.data.data.member.id}`
                        ));
                        
                        window.location.href = process.env.REACT_APP_HOME_URL
                    }

                    else if(r.data.code === 2002 || r.data.code === 2003){ // 회원가입 성공 시
                        setid(r.data.data.id)
                    }
                    else if(r.data.code === 2101 || r.data.code === 2201 || r.data.code === 2202 ){
                        window.location.href = `${process.env.REACT_APP_HOME_URL}/login`
                    }
                    else{alert('warning')}
                })
            }
            catch(error){
                console.error('Error fetching data:', error);
            }
        }
        getid()
    },[])
    return (
        <div>
                    <div>
            {/* <Header/> */}
            <div className="auth">
                인가코드 :  {c}
                {id? <div>uuid : {id}</div> :''}
            </div>
                        <button>회원가입</button>
                        <div>로딩중...</div>

        </div>
        </div>
    );
};

export default LoginAuth;