import * as Dialog from '@radix-ui/react-dialog';
import { Input } from './Form/Input';
import { FormEvent } from 'react';

import axios from 'axios';

export function CreateGameModal(){

      const handleCreateGame = async (event: FormEvent) =>{
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData);

       try{ 
        await axios.post(`http://localhost:3333/games/`,{
          title : data.title,
          imageUrl: data.imageUrl,
        })
        alert('Jogo cadastrado com sucesso!')
      } catch(err){
        console.log(err);
        alert('Erro ao criar anúncio!')
      }
      }

    return(
    <Dialog.Portal>
    <Dialog.Overlay className='bg-black/70 inset-0 fixed'/>

    <Dialog.Content className='fixed bg-[#27272a] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/50'>
      <Dialog.Title className='text-3xl font-black'>Crie um grupo</Dialog.Title>
 
        <form onSubmit={handleCreateGame} className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='title'>Nome do jogo</label>
            <Input id='name' name='name'placeholder='Nome do jogo' 
              />
          </div>

          <div className='grid grid-cols gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='imageUrl'>Insira a url para imagem</label>
              <Input id='imageUrl' name='imageUrl' type='text' placeholder='https://www.google.com' 
              />
            </div>
          </div>

        </form>

    </Dialog.Content>
  </Dialog.Portal>
  )
}