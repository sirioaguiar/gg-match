import './styles/main.css';
import { useState, useEffect } from 'react'; 
import * as Dialog from '@radix-ui/react-dialog';

import logoImg from './assets/logoGG.png';
import { Card } from './components/Card';
import { CreateGroupAd } from './components/CreateGroupAd';
import { CreateGameAd } from './components/CreateGameAd';
import { CreateGroupModal } from './components/CreateGroupModal';
import axios from 'axios';
import { CreateGameModal } from './components/CreateGameModal';



interface Card {
  id: string;
  title: string;
  imageUrl: string;
  _count: {
    groups: number  ;
  }

}

function App() {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(()=>{
    axios('http://localhost:3333/games').then(response => {
      setCards(response.data);
    })
  },[cards])

  return (
   <div className='max-w-[1120px] mx-auto flex flex-col items-center my-20'>
    <img src={logoImg} alt=''/>

    <h1 className='text-5xl text-zinc-200 font-black mt-10'>
      Jogue entre amigos.
    </h1>

    <div className='grid grid-cols-6 gap-6 mt-16'>

      {
        cards.map(card => {
          return(
            <Card 
            key={card.id}
            title={card.title}
            imageUrl={card.imageUrl}
            groupsCount={card._count.groups}
           />
          )
        })
      }


    </div>
   
    <Dialog.Root>
    <CreateGameModal />  
    <CreateGameAd />
    </Dialog.Root>

   <Dialog.Root>
    <CreateGroupModal />
    <CreateGroupAd />
    </Dialog.Root>



   </div>
)
}                                                                                                                                                                                                                                       

export default App