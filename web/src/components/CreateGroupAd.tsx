import {  UsersThree } from 'phosphor-react';
import * as Dialog  from '@radix-ui/react-dialog'

export function CreateGroupAd(){
    return (
        <div className='bg-zinc-800 px-10 py-4 self-stretch mt-10 rounded-lg flex justify-between items-center'>
        <div>
          <strong className='text-2xl font-black block'>Acho seu jogo?</strong>
          <span className='block'>Crie um grupo e vamos jogar.</span>
        </div>
  
        <Dialog.Trigger className='py-3 px-4 bg-fuchsia-900 hover:bg-fuchsia-600 rounded-md flex items-center gap-2'>
          <UsersThree size={24}/>
          Cadastrar grupo
        </Dialog.Trigger>

      </div>
    )
}