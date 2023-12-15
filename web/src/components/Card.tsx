import { CardProps } from "../pages/Home"

export function Card(props :CardProps){
    return (
        <div onClick={() => {
            props.setFiltroGroup(props.id)
          }          
        } className='relative cardGame'>
          <img src={props.imageUrl} alt=''/>
          <div className='w-full pt-1 pb-4 px-4 bg-zinc-800 bg-opacity-90  absolute bottom-0 left-0 right-0'>
            <strong className='font-bold block'>{props.title}</strong>
            <span className='text-sm block mt-1'>{props.groupsCount} grupo(s)</span>
          </div>
        </div>
      
    )
}