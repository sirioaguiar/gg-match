import {  UsersThree } from 'phosphor-react';
import * as Dialog  from '@radix-ui/react-dialog'
import { GroupCardProps } from '../pages/Home';

export function CreateGroupAd(props :GroupCardProps){
  if(props.playerLogado == undefined){ 
    return (
      <div className='bg-zinc-800 px-10 py-3 mb-4 self-stretch mt-10 rounded-lg flex justify-between items-center'>
      <div>
        <strong className='text-2xl font-black block'>Acho seu jogo?</strong>
        <span className='block'>Crie um grupo e vamos jogar.</span>
      </div>
          <span className="d-inline-block" tabIndex={0} data-toggle="tooltip" title="Faça o login primeiro!" style={{cursor:'not-allowed'}}>
            <Dialog.Trigger  onClick={() => props.setReloadCards(true)} disabled={(props.playerLogado == undefined)?true:false} className='py-2 px-4 bg-fuchsia-900 hover:bg-fuchsia-600 rounded-md flex items-center gap-2' style={{backgroundColor:'#533852', pointerEvents: 'none'}}>
              <UsersThree size={24}/>
              Criar grupo
            </Dialog.Trigger>
        </span>
    </div>
  )} else{
    return (
      <div className='bg-zinc-800 px-10 py-3 mb-4 self-stretch mt-10 rounded-lg flex justify-between items-center'>
      <div>
        <strong className='text-2xl font-black block'>Acho seu jogo?</strong>
        <span className='block'>Crie um grupo e vamos jogar.</span>
      </div>
       <Dialog.Trigger onClick={() => props.setReloadCards(true)} className='py-2 px-4 bg-fuchsia-900 hover:bg-fuchsia-600 rounded-md flex items-center gap-2'>
          <UsersThree size={24}/>
          Criar grupo
        </Dialog.Trigger>
    </div>
  )
  }
    
}