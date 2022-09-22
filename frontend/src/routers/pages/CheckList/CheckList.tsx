import {FC} from 'react'

interface CheckListProps {
  
}
 
const CheckList: FC<CheckListProps> = () => {
  return (<>
  <main
        className="my-[5rem] grid p-5
    w-full grid-cols-3 content-start bg-[white]"
      >
       this is check list page
      </main>
  </>);
}
 
export default CheckList;