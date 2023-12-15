
import { useState, useEffect } from 'react'; 
import * as Dialog from '@radix-ui/react-dialog';

import logoImg from '../assets/logoGG.png';
import { Card } from '../components/Card';
import { GroupCards } from '../components/GroupCards';
import { CreateGroupAd } from '../components/CreateGroupAd';
import { CreateGroupModal } from '../components/CreateGroupModal';
import { CreatePlayerModal } from '../components/CreatePlayerModal';
import axios from 'axios';
import { RoomGroupModal } from '../components/RoomGroupModal';

interface Card {
  id: number;
  title: string;
  imageUrl: string;
  _count: {
    groups: number  ;
  }

}

export interface GroupCard{
  id: number,
  name: string,
  gameDays: string,
  useMicrophone: boolean,
  hourInit: number,
  hourEnd: number,
  game: Card,
  owner: Player,
  ratingStars: string,
  totalPlayersOnline: string,
  players: string,
  maxPlayers: number,
  totalRatingStars: string,
  mediaRatingStars: string
}

export interface RoomGroupModalProps{
  playerLogado: Player|undefined;
  groupCard: GroupCard | null;
}

export interface CardProps{
  id: number,
  imageUrl: string,
  title: string,
  groupsCount: number,
  setFiltroGroup: (param: number) => void 
}
export interface GroupCardProps {
  setReloadCards: (param: boolean) => void | null;
  groupCard: GroupCard | null;
  playerLogado: Player|undefined;
}

export interface PlayerCardProps {
  setPlayer: (param: Player|undefined) => void;
  titleModalPlayer: string;
}
export interface Player {
  id: number;
  name: string;
  username: string;
}

function loginTop(player: Player|undefined, setPlayer: (param: Player|undefined) => void , titleModalPlayer: string, setTitleModalPlayer: (param: string) => void ) {
  
  if (player) {
    return (
      <p className='pr-5'>
        {player.name} / <span onClick={() => {
          
            setPlayer(undefined)
            alert('Logoff realizado com sucesso!')
          }          
        } style={{cursor:"pointer"}}>Sair</span>
      </p>
    );
  } else {
    return (
      <p className='pr-5'>
        <Dialog.Root>
          <CreatePlayerModal setPlayer={setPlayer} titleModalPlayer={titleModalPlayer}/>
            <Dialog.Trigger>              
            <span onClick={() => {
                setTitleModalPlayer('Login Player')
              }          
            } style={{cursor:"pointer"}}>Login</span> / <span onClick={() => {
              setTitleModalPlayer('Novo Player')
            }          
          } style={{cursor:"pointer"}}>Registrar</span>
            </Dialog.Trigger>
        </Dialog.Root>
      </p>
    );
  }
}

export function Home(){
  const [cards, setCards] = useState<Card[]>([]);
  const [groupCards, setGroupCards] = useState<GroupCard[]>([]);
  const [reloadCards, setReloadCards] = useState(true);
  const [filtroGroup, setFiltroGroup] = useState(0);
  const [player, setPlayer] = useState<Player|undefined>(undefined);
  const [titleModalPlayer, setTitleModalPlayer] = useState('Novo Player');
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    axios('http://localhost:3333/games').then(response => {
      if(reloadCards) {
        setCards(response.data);
        setReloadCards(false);
        setOpen(false);
      }
    })
  },[reloadCards])

  useEffect(()=>{
    let urlListGroups = 'http://localhost:3333/groups/list';
    if(filtroGroup != 0) urlListGroups = 'http://localhost:3333/groups/filtro/game/'+filtroGroup;
    axios(urlListGroups).then(response => {
        setGroupCards(response.data);
        //console.log(response.data);
    })
  },[filtroGroup, reloadCards])

  return (
   <div className='container-fluid flex flex-col items-center my-15'>
    <div className='row'>
      <div className='py-2 self-stretch flex justify-end items-right' style={{background: '#000000c7'}}>
        {loginTop(player, setPlayer, titleModalPlayer, setTitleModalPlayer)}
      </div>
      <div className='col-12 pb-4 flex justify-center items-center'>
        <img src={logoImg} alt=''/>

        <h1 className='text-5xl text-zinc-200 font-black mt-10 pl-5'>
          Jogue entre<br></br>amigos.
        </h1>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-16'>

        {
          cards.map(card => { 
            return(
              <Card 
              key={card.id}
              id={card.id}
              title={card.title}
              imageUrl={card.imageUrl}
              groupsCount={card._count.groups}
              setFiltroGroup={setFiltroGroup}
            />
            )
          })
        }


      </div>
    
      <Dialog.Root>
        <CreateGroupModal setReloadCards={setReloadCards} groupCard={null} playerLogado={player} />
        <CreateGroupAd playerLogado={player} setReloadCards={setOpen} groupCard={null}/>
      </Dialog.Root>

        <div className="row mx-auto px-0">
        {
            groupCards.map(group => { //console.log(group )
              return(
                <Dialog.Root>
                  <RoomGroupModal playerLogado={player} groupCard={group} />
                  <GroupCards
                    key={group.id}
                    groupCard={group}
                    setReloadCards={()=>{return}}
                    playerLogado={player}
                    />
                </Dialog.Root>)
            })
          }
        </div>
    </div>
  </div>
)
}