import './styles/main.css';
import { UsersThree } from 'phosphor-react';

import logoImg from './assets/logoGG.png';

function App() {
  return (
   <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
    <img src={logoImg} alt=''/>

    <h1 className='text-5xl text-zinc-200 font-black mt-10'>
      Jogue entre amigos.
    </h1>

    <div className='grid grid-cols-6 gap-6 mt-16'>
      <a href='' className='relative'>
        <img src='/lol.png' alt=''/>
        <div className='w-full pt-1 pb-4 px-4 bg-zinc-800 bg-opacity-90  absolute bottom-0 left-0 right-0 rounded-b-lg'>
          <strong className='font-bold block'>League of Legends</strong>
          <span className='text-sm block mt-1'>3 grupos</span>
        </div>
      </a>
      <a href='' className='relative'>
        <img src='/cs.png' alt=''/>
        <div className='w-full pt-1 pb-4 px-4 bg-zinc-800 bg-opacity-90  absolute bottom-0 left-0 right-0 rounded-b-lg'>
          <strong className='font-bold block'>Counter Strike</strong>
          <span className='text-sm block mt-1'>3 grupos</span>
        </div>
      </a>
      <a href=''  className='relative'>
        <img src='/apex.png' alt=''/>
        <div className='w-full pt-1 pb-4 px-4 bg-zinc-800 bg-opacity-90  absolute bottom-0 left-0 right-0 rounded-b-lg'>
          <strong className='font-bold block'>Apex Legends</strong>
          <span className='text-sm block mt-1'>3 grupos</span>
        </div>
      </a>
      <a href=''  className='relative'>
        <img src='/dota.png' alt=''/>
        <div className='w-full pt-1 pb-4 px-4 bg-zinc-800 bg-opacity-90  absolute bottom-0 left-0 right-0 rounded-b-lg'>
          <strong className='font-bold block'>DOTA</strong>
          <span className='text-sm block mt-1'>3 grupos</span>
        </div>
      </a>
      <a href='' className='relative'>
        <img src='/fortnite.png' alt=''/>
        <div className='w-full pt-1 pb-4 px-4 bg-zinc-800 bg-opacity-90  absolute bottom-0 left-0 right-0 rounded-b-lg'>
          <strong className='font-bold block'>Fortnite</strong>
          <span className='text-sm block mt-1'>3 grupos</span>
        </div>
      </a>
      <a href='' className='relative'>
        <img src='/wow.png' alt=''/>
        <div className='w-full pt-1 pb-4 px-4 bg-zinc-800 bg-opacity-90  absolute bottom-0 left-0 right-0 rounded-b-lg'>
          <strong className='font-bold block'>World of Warcraft</strong>
          <span className='text-sm block mt-1'>3 grupos</span>
        </div>
      </a>

    </div>
    <div className='bg-zinc-800 px-10 py-4 self-stretch mt-10 rounded-lg flex justify-between items-center'>
      <div>
        <strong className='text-2xl font-black block'>Não achou seu jogo?</strong>
        <span className='block'>Crie um grupo e vamos jogar.</span>
      </div>

      <button className='py-3 px-4 bg-fuchsia-900 hover:bg-fuchsia-600 rounded-md flex items-center gap-2'>
        <UsersThree size={24}/>
        Criar grupo
      </button>
    </div>



   </div>
)
}                                                                                                                                                                                                                                       

export default App