import * as Dialog from '@radix-ui/react-dialog';
import { Input } from './Form/Input';
import { FormEvent, useEffect } from 'react';
import { PlayerCardProps } from '../pages/Home';

import axios from 'axios';
export function CreatePlayerModal(props :PlayerCardProps){
        
    useEffect(()=>{
        // axios('http://localhost:3333/player/logar').then(response => {
        //     console.log(response.data);
        // })
      },[])

    const handleCreatePlayer = async (event: FormEvent) =>{
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData);

       try{ 
        await axios.post(`http://localhost:3333/player/create`,{
          name : data.name,
          username: data.username,
          password: data.password
        }).then(response => {
             props.setPlayer(response.data);
        })
        alert('Player criado com sucesso!')
      } catch(err){
        console.log(err);
        props.setPlayer(undefined);
        alert('Erro ao criar player!')
      }
    }

    const handleLoginPlayer = async (event: FormEvent) =>{
      event.preventDefault();

      const formData = new FormData(event.target as HTMLFormElement)
      const data = Object.fromEntries(formData);

     try{ 
      await axios.post(`http://localhost:3333/player/logar`,{
        username: data.username,
        password: data.password
      }).then(response => {
          const player = response.data[0];
           props.setPlayer(player);
           //console.log(response.data)
      })
      alert('Login realizado com sucesso!')
    } catch(err){
      console.log(err);
      props.setPlayer(undefined);
      alert('Erro ao tentar logar!')
    }
  }
  function openRegistrarForm(){
    return(
      <form onSubmit={handleCreatePlayer} className='mt-8 flex flex-col gap-4'>

                <div className='flex flex-col gap-2'>
                  <label htmlFor='name'>Seu nome</label>
                  <Input id='name' name='name' placeholder='Seu nome' 
                    />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='username'>Seu usuario</label>
                  <Input id='username' name='username' placeholder='Usuário do login' 
                    />
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor='password'>Sua senha</label>
                  <Input type="password" id='password' name='password' placeholder='Sua senha'
                    />
                </div>

                <footer className=' mt-4 flex justify-end gap-4'>
                  <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
                  <button 
                    className='bg-fuchsia-900 hover:bg-fuchsia-600  px-5 h-12 rounded-md font-semibold flex items-center gap-2' 
                    type='submit'
                  >
                    Criar Conta
                    </button>
                </footer>
              </form>
    )
  }
  function openLoginForm(){
    return(
      <form onSubmit={handleLoginPlayer} className='mt-8 flex flex-col gap-4'>

                <div className='flex flex-col gap-2'>
                  <label htmlFor='username'>Seu usuario</label>
                  <Input id='username' name='username' placeholder='Usuário do login' 
                    />
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor='password'>Sua senha</label>
                  <Input type="password" id='password' name='password' placeholder='Sua senha'
                    />
                </div>

                <footer className=' mt-4 flex justify-end gap-4'>
                  <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
                  <button 
                    className='bg-fuchsia-900 hover:bg-fuchsia-600  px-5 h-12 rounded-md font-semibold flex items-center gap-2' 
                    type='submit'
                  >
                    Logar
                    </button>
                </footer>
              </form>
    )
  }

    return(
    <Dialog.Portal>
    <Dialog.Overlay className='bg-black/70 inset-0 fixed'/>

    <Dialog.Content className='fixed bg-[#27272a] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/50'>
      <Dialog.Title className='text-3xl font-black'>{props.titleModalPlayer}</Dialog.Title>
      {
        (props.titleModalPlayer == 'Login Player')?openLoginForm():openRegistrarForm()
      } 
    </Dialog.Content>
  </Dialog.Portal>
  )
}