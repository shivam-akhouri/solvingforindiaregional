import {View} from 'react-native'
import RBSheet from "react-native-raw-bottom-sheet";

const BottomSheet = (props)=>{
    return (
        <RBSheet
          ref={props.ref}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={300}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >
          {props.children}
        </RBSheet>
    )
}

export default BottomSheet