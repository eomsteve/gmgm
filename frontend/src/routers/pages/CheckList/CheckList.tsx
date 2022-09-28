import {FC} from 'react'
import BusinessSelector from '@src/components/checkList/CheckListMainBusinessSelector'

interface CheckListProps {
  
}
 
const CheckList: FC<CheckListProps> = () => {
  return (<>
  <main
        className="flex w-full mb-[5rem] flex-col justify-center p-5 bg-[white]"
      >
        <BusinessSelector optionList={['']}/>

      </main>
  </>);
}
 
export default CheckList;