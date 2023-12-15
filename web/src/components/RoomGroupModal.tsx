import * as Dialog from '@radix-ui/react-dialog';
import { Player, Post, RoomGroupModalProps } from "../pages/Home";
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from './Form/Input';

export function RoomGroupModal(props :RoomGroupModalProps){
  const groupCard = props.groupCard;
  const playerLogado = props.playerLogado;
  const totalPlayersApp = props.totalPlayersApp;
  const playersNaSalaArray = groupCard?.players.split(',');

  const [isToPosts, setIsToPosts] = useState(0);
  const [getPostsOnGroup, setGetPostsOnGroup] = useState<Post[]>([]);
  const [gameDays, setGameDays] = useState<string[]>([]);
  const [isRespOk, setIsRespOk] = useState(false);

  useEffect(()=>{
    if(groupCard != null) axios('http://localhost:3333/group/posts/list/'+groupCard.id).then(response => {
      setGetPostsOnGroup(response.data);
        //console.log(response.data);
    })
  },[groupCard, isToPosts])

  const handlePostCreate = async (event: FormEvent) =>{
    event.preventDefault();
    const formEventGroup = event.target as HTMLFormElement
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData);

   try{ 
    await axios.post(`http://localhost:3333/group/post/create`,{
      text: data.text,
      groupId: data.groupId,
      ownerId: data.ownerId
    }).then(response => {
        const post = response.data;
         setIsToPosts(post.id);
         console.log(post)
         setIsRespOk(true)
         setTimeout(function(){setIsRespOk(false)},1000)
         formEventGroup.reset()
    })
    
  } catch(err){
    console.log(err);
    //props.setPlayer(undefined);
    alert('Erro ao tentar logar!')
  }
}
    
  if(groupCard == null || playerLogado == undefined) return(
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/70 inset-0 fixed'/>

      <Dialog.Content className='fixed bg-[#27272a] py-6 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/50'>
        <Dialog.Title className='text-3xl font-white'>Logar no website</Dialog.Title>
        <div className='row'>
          <div className='col-12'>
            <p className='my-3'>É preciso estar logado no website para entrar na sala.</p>
            <p><Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Voltar</Dialog.Close></p>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
  else return(
    <Dialog.Portal>
    <Dialog.Overlay className='bg-black/70 inset-0 fixed'/>

    <Dialog.Content className='cardRoomGroup fixed bg-[#27272a] py-6 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[100%] h-[100%] max-w-[100%] max-h-[100%] shadow-lg shadow-black/50'>
      <Dialog.Title className='text-3xl mb-4 pb-1 font-white'>Grupo {groupCard.name}</Dialog.Title>
        <div className='row'>
          <div className='col-2'>
              <img src={groupCard.game.imageUrl} className='card-img img-fluid' style={ {minHeight:270} } alt={groupCard.game.title} />  
          </div>
          <div className='col-4'>
            <h3 className='card-title h5 mb-0 text-left'>Dados do Grupo</h3>
            <div className='card-body pl-1'>
              <p className='card-text'><span className="h6">Game: </span>{groupCard.game.title}</p>
              <p className='card-text'><span className="h6">Players: </span>{groupCard.totalPlayersOnline+" / "+groupCard.maxPlayers}</p>
              <p className='card-text'><span className="h6">Owner: </span>{groupCard.owner.name}</p>
              <p className='card-text mt-3 mb-3'><span className="h6">Dias de Jogos: </span></p>
              <ToggleGroup.Root 
              type='multiple' 
              disabled={true}
              className='grid grid-cols-7 gap-2 cardDias mb-5'
              value={gameDays}
              onValueChange={setGameDays}>
              <ToggleGroup.Item
                  value='0'
                  title='Domingo'
                  className={` w-6 h-6 rounded-sm ${groupCard.gameDays.includes('0') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}>
                  D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item 
                  value='1'
                  title='Segunda'
                  className={` w-6 h-6 rounded-sm ${groupCard.gameDays.includes('1') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}>
                  S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item 
                  value='2'
                  title='Terça'
                  className={` w-6 h-6 rounded-sm ${groupCard.gameDays.includes('2') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}>
                  T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                  value='3' 
                  title='Quarta'
                  className={` w-6 h-6 rounded-sm  ${groupCard.gameDays.includes('3') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}>
                  Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item 
                  value='4'
                  title='Quinta'
                  className={` w-6 h-6 rounded-sm  ${groupCard.gameDays.includes('4') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}>
                  Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item 
                  value='5'
                  title='Sexta'                    
                  className={` w-6 h-6 rounded-sm ${groupCard.gameDays.includes('5') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}>
                  S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item 
                  value='6'                    
                  title='Sábado'
                  className={` w-6 h-6 rounded-sm  ${groupCard.gameDays.includes('6') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}>
                  S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
                <p className={"card-text "+groupCard.mediaRatingStars}><span className="h6">Avaliação: </span><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><em className='card-text float-right pr-3'>Votos: {groupCard.totalRatingStars}</em></p>
              </div>    
          </div>
          <div className='col-6'>            
            <h3 className='card-title h5 mb-0 text-left'>Dados do Owner</h3>
            <div className='card-body pl-1'>
              <p className='card-text'><span className="h6">Nome: </span>{groupCard.owner.name}</p>
              <p className='card-text'><span className="h6">Username: </span>{groupCard.owner.username}</p>
              <p className={"my-2 card-text "+groupCard.mediaRatingStars}><span className="h6">Avaliação: </span><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><em className='card-text float-right pr-3'>Votos: {groupCard.totalRatingStars}</em></p>
            </div>
            <h3 className='card-title h5 mt-3 mb-0 text-left'>Adicionar Post ao Feed</h3>
            <form onSubmit={handlePostCreate} className='mt-3 flex flex-col gap-3'>
                <input type='hidden' name='ownerId' value={playerLogado.id}></input>
                <input type='hidden' name='groupId' value={groupCard.id}></input>
                <div className='flex flex-col gap-2 inputEspecial'>
                  <label htmlFor='text'><b>Mensagem</b></label>
                  <Input id='text' name='text' placeholder='Digite sua Mensagem' />
                  <em class='respMsgPost' className={(!isRespOk)?'d-none':''}>Mensagem enviada com sucesso!</em>
                </div>
                <footer className='mt-0 flex justify-end'>
                  <button 
                    className='bg-fuchsia-900 hover:bg-fuchsia-600  px-4 h-8 rounded-md font-semibold flex items-center gap-2' 
                    type='submit'
                  >
                    Enviar
                    </button>
                </footer>
              </form>
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col-6'>
            <h3 className='card-title h5 mb-3 text-left'>Players no Grupo</h3>
            { totalPlayersApp.map(player => {
              return <p key={player.id} className={(playersNaSalaArray?.indexOf(player.id.toString())==-1)?'d-none':''}><i className="bi bi-person-circle pr-2"></i> {player.name} ({player.username})</p>
              })}
          </div>
          <div className='col-6'>
            <h3 className='card-title h5 mb-3 text-left'>Posts do Grupo</h3>
            { getPostsOnGroup.map(post => {
              return <p key={post.id}><i className="bi bi-postcard pr-2"></i> {post.owner.name}<br></br><em>{post.text}</em> </p>
              })}
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-12 text-right'>
            <Dialog.Close type='button' className='bg-fuchsia-900 hover:bg-fuchsia-600 px-5 h-12 rounded-md font-semibold'>Sair</Dialog.Close>
          </div>
        </div>


    </Dialog.Content>
  </Dialog.Portal>
  )
}
