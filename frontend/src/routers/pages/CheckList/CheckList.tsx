import {FC} from 'react'
import BusinessSelector from '../../../components/checkList/BusinessSelector'

interface CheckListProps {
  
}
 
const CheckList: FC<CheckListProps> = () => {
  return (<>
  <main
        className="flex w-full mb-[5rem] flex-col justify-center p-5 bg-[white]"
      >
        <BusinessSelector optionList={['']}/>
       this is check list page
      </main>
  </>);
}
 
export default CheckList;