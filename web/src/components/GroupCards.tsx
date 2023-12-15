import * as Dialog from '@radix-ui/react-dialog';
import { UsersThree } from "phosphor-react";
import { GroupCardProps } from "../pages/Home";
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useState } from 'react';

export function GroupCards(props :GroupCardProps){

    const [gameDays, setGameDays] = useState<string[]>([]);

    const groupCard = props.groupCard;
    if(groupCard == null) { return (
      <div className="col col-4">
        <div className='card mb-3'>
          <div className="row no-gutters">
            <div className="col-md-12">
              <div className='card-body'>
                <h5 className='card-title'>...</h5>
                <p className='card-text'>...</p>
              </div>
              <div className='card-footer'>
                <small className='text-muted'><button className="btn btn-sm btn-" >...</button></small>
              </div>
            </div>
          </div>
        </div>   
      </div>
    ) } else return (
        <div className="col col-12 col-sm-6 col-xl-4">
          <div className='card mb-3'>
            <div className="row no-gutters">
              <div className="card-header col-12">
                <h3 className='card-title h5 mb-0 text-center'>{groupCard.name}</h3>
              </div>
              <div className="col-md-5 pr-auto">
                <img src={groupCard.game.imageUrl} className='card-img img-fluid' style={ {minHeight:270} } alt={groupCard.game.title} />
              </div>
              <div className="col-md-7">
                <div className='card-body pl-1'>
                  <p className='card-text'><span className="h6 text-muted">Game: </span>{groupCard.game.title}</p>
                  <p className='card-text'><span className="h6 text-muted">Players: </span>{groupCard.totalPlayersOnline+" / "+groupCard.maxPlayers}</p>
                  <p className='card-text'><span className="h6 text-muted">Owner: </span>{groupCard.owner.name}</p>
                  <p className='card-text mt-2 mb-1'><span className="h6 text-muted">Dias de Jogos: </span></p>
                <ToggleGroup.Root 
                type='multiple' 
                disabled={true}
                className='grid grid-cols-7 gap-2 cardDias mb-3'
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
                  <p className={"card-text "+groupCard.mediaRatingStars}><span className="h6 text-muted">Avaliação: </span><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><em className='text-muted float-right pr-3'>Votos: {groupCard.totalRatingStars}</em></p>
                  <p className='card-text'>
                    <Dialog.Trigger className="pb-1 px-2 mt-3 bg-fuchsia-900 hover:bg-fuchsia-600 rounded-md flex items-center gap-2">
                        <UsersThree size={24}/>
                      Entrar
                    </Dialog.Trigger>
                  </p>
                </div>
              </div>
            </div>
          </div>   
        </div>  
)}
