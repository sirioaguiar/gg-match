import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import { GameController, Check } from 'phosphor-react';
import { Input } from './Form/Input';
import { FormEvent, useEffect,useState } from 'react';

import axios from 'axios';

interface Card {
    id: string;
    title: string;
  }


export function CreateGroupModal(){
    const [games, setGames] = useState<Card[]>([]);
    const [gameDays, setGameDays] = useState<string[]>([]);
    const [useMicrophone, setUseMicrophone] = useState(false);

    useEffect(()=>{
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data);
        })
      },[])

      const handleCreateGroup = async (event: FormEvent) =>{
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData);

       try{ 
        await axios.post(`http://localhost:3333/games/${data.game}/groups`,{
          name : data.name,
          discord: data.discord,
          hourInit: data.hourInit,
          hourEnd: data.hourEnd,
          gameDays: gameDays.map(Number),
          useMicrophone: useMicrophone
        })
        alert('Anúncio criado com sucesso!')
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
 
        <form onSubmit={handleCreateGroup} className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='game' className='font-semibold'>Qual o jogo?</label>
              <select
                id='game' 
                name='game'
                className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'
                defaultValue=''
                >
                <option disabled value=''>Selecione o jogo que deseja jogar</option>
                { games.map(game => {
                    return <option key={game.id} value={game.id}>{game.title}</option>
                    })}
                </select>
          </div>  

          <div className='flex flex-col gap-2'>
            <label htmlFor='name'>Seu nome (ou nickname)</label>
            <Input id='name' name='name'placeholder='Como te chamam dentro do game' 
              />
          </div>

          <div className='grid grid-cols gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='discord'>Qual seu Discord?</label>
              <Input id='discord' name='discord' type='text' placeholder='Usuario#XXXXXX' 
              />
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
   
              <label htmlFor='weekDays'>Quando costuma jogar?</label>

              <ToggleGroup.Root 
                type='multiple' 
                className='grid grid-cols-7 gap-2'
                value={gameDays}
                onValueChange={setGameDays}>
                <ToggleGroup.Item
                    value='0'
                    title='Domingo'
                    className={` w-8 h-8 rounded-sm ${gameDays.includes('0') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}>
                    D
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                    value='1'
                    title='Segunda'
                    className={` w-8 h-8 rounded-sm ${gameDays.includes('1') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}>
                    S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                    value='2'
                    title='Terça'
                    className={` w-8 h-8 rounded-sm ${gameDays.includes('2') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}>
                    T
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                    value='3' 
                    title='Quarta'
                    className={` w-8 h-8 rounded-sm  ${gameDays.includes('3') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}>
                    Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                    value='4'
                    title='Quinta'
                    className={` w-8 h-8 rounded-sm  ${gameDays.includes('4') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}>
                    Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                    value='5'
                    title='Sexta'                    
                    className={` w-8 h-8 rounded-sm ${gameDays.includes('5') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}>
                    S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                    value='6'                    
                    title='Sábado'
                    className={` w-8 h-8 rounded-sm  ${gameDays.includes('7') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}>
                    S
                    </ToggleGroup.Item>
                  </ToggleGroup.Root>
          </div>
            </div>
            <div className='flex flex-col flex-1'>
            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor='hourInit'>Qual horário?</label>
              <div className='grid grid-cols-2 gap-2'>
                <Input id='hourInit' name='hourInit' type='time' placeholder='De'/>
                <Input id='hourEnd' name='hourEnd' type='time' placeholder='Até'/>
              </div>
            </div>
            </div>
    
          <label className='mt-2 flex items-center gap-2 text-sm'>
            <Checkbox.Root 
            checked={useMicrophone}
             onCheckedChange={(checked)=>{
              if(checked === true) {
                setUseMicrophone(true) 
              }else {
                setUseMicrophone(false)
              }
              }

            }
            className='w-6 h-6 rounded p-1 bg-zinc-900' 
            >
                <Checkbox.Indicator>
                    <Check className='w-4 h-4 text-emerald-400 align'/>
                </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className=' mt-4 flex justify-end gap-4'>
            <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
            <button 
              className='bg-fuchsia-900 hover:bg-fuchsia-600  px-5 h-12 rounded-md font-semibold flex items-center gap-2' 
              type='submit'
            >
              <GameController size={24}/>
              Encontrar grupo
              </button>
          </footer>
        </form>

    </Dialog.Content>
  </Dialog.Portal>
  )
}