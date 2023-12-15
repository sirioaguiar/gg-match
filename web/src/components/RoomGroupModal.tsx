import * as Dialog from '@radix-ui/react-dialog';
import { Player, RoomGroupModalProps } from "../pages/Home";

export function RoomGroupModal(props :RoomGroupModalProps){
  const groupCard = props.groupCard;
  const playerLogado = props.playerLogado;
    
  if(groupCard == null || playerLogado == undefined) return(
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/70 inset-0 fixed'/>

      <Dialog.Content className='fixed bg-[#27272a] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/50'>
        <Dialog.Title className='text-3xl font-black'>Logar no website</Dialog.Title>
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

    <Dialog.Content className='fixed bg-[#27272a] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[100%] h-[100%] max-w-[100%] max-h-[100%] shadow-lg shadow-black/50'>
      <Dialog.Title className='text-3xl font-black'>Sala: {groupCard.name}</Dialog.Title>
        <div className='row'>
          <div className='col-12'>
            <h3 className='card-title h4 mb-0 text-center'>{groupCard.name}</h3>
          </div>
          <div className='col-2'>
              <img src={groupCard.game.imageUrl} className='card-img img-fluid' style={ {minHeight:270} } alt={groupCard.game.title} />  
          </div>
          <div className='col-5'>
            <h3 className='card-title h5 mb-0 text-left'>Dados do Grupo</h3>
            <p className='card-text'><span className="h6 text-muted">Game: </span>{groupCard.game.title}</p>
            <p className='card-text'><span className="h6 text-muted">Owner: </span>{groupCard.owner.name}</p>
            <p className='card-text'><span className="h6 text-muted">Total de Votos: </span>{groupCard.totalRatingStars}</p>
            <p className={"card-text "+groupCard.mediaRatingStars}><span className="h6 text-muted">Avaliação: </span><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i></p>
            <p className='card-text'>
              <button className="pb-1 px-2 mt-3 bg-fuchsia-900 hover:bg-fuchsia-600 rounded-md flex items-center gap-2" onClick={()=>console.log('idSala: '+groupCard.id)} style={{backgroundColor:'#533852', pointerEvents: 'none'}}>Entrar</button>
            </p>
          </div>
          <div className='col-5'>
          <h3 className='card-title h5 mb-0 text-left'>Dados dos Players</h3>
            <p className='card-text'><span className="h6 text-muted">Game: </span>{groupCard.game.title}</p>
            <p className='card-text'><span className="h6 text-muted">Players: </span>{groupCard.totalPlayersOnline+" / "+groupCard.maxPlayers}</p>
            <p className='card-text'><span className="h6 text-muted">Owner: </span>{groupCard.owner.name}</p>
            <p className='card-text'><span className="h6 text-muted">Total de Votos: </span>{groupCard.totalRatingStars}</p>
            <p className={"card-text "+groupCard.mediaRatingStars}><span className="h6 text-muted">Avaliação: </span><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i></p>
            <p className='card-text'>
              <button className="pb-1 px-2 mt-3 bg-fuchsia-900 hover:bg-fuchsia-600 rounded-md flex items-center gap-2" onClick={()=>console.log('idSala: '+groupCard.id)} style={{backgroundColor:'#533852', pointerEvents: 'none'}}>Entrar</button>
            </p>
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            <h3 className='card-title h5 mb-0 text-left'>Players no Grupo</h3>
          </div>
          <div className='col-6'>
            <h3 className='card-title h5 mb-0 text-left'>Posts do Grupo</h3>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
          </div>
        </div>


    </Dialog.Content>
  </Dialog.Portal>
  )
}
