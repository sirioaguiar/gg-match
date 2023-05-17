import './styles/main.css';
import { useState, useEffect } from 'react'; 

import logoImg from './assets/logoGG.png';
import { Card } from './components/Card';
import { CreateGroupAd } from './components/CreateGroupAd';


function App() {
  const [games, setGames] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:3333/games')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
  },[])

  return (
   <div className='max-w-[1120px] mx-auto flex flex-col items-center my-20'>
    <img src={logoImg} alt=''/>

    <h1 className='text-5xl text-zinc-200 font-black mt-10'>
      Jogue entre amigos.
    </h1>

    <div className='grid grid-cols-6 gap-6 mt-16'>
      <Card 
       imageUrl='/lol.png'
       title='League of Legends'
       groupsCount={1} 
      />

    </div>
   
    <CreateGroupAd />


   </div>
)
}                                                                                                                                                                                                                                       

export default App