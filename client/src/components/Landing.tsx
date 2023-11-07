import React from 'react';
import {useNavigate} from 'react-router-dom'

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='h-screen w-full flex flex-col gap-1 items-center justify-center' style={{"backgroundColor":"#eef6f8"}}>
      <button onClick={()=> navigate("/")}></button>
    </div>
  );
}

export default Landing;
