import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const GetQuestions = () => async (dispatch: any) => {
    dispatch({ type: "Switch_Questions_Loading", payload: true })
    //Real time firebase changes to check on the questions as they change
    let result: any[] = []
    const events = await firestore().collection('Questions')
    events.onSnapshot((querySnapshot) => {
        try {
            result = []
            querySnapshot.forEach((doc) => {
                result.push({ ...doc.data() })
            });
            dispatch({ type: 'Set_Questions_Array', payload: result })
        } catch {
            Alert.alert("Error loading questions")
        }
    })
    dispatch({ type: "Switch_Questions_Loading", payload: false })
}
