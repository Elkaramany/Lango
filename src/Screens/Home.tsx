import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

import { Colors, GlobalStyles, HEIGHT, WIDTH } from '../Config/Constants';
import { GetQuestions } from '../Redux/Actions';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { QUESTION } from '../Redux/Reducers/types';

import Header from '../Components/Header';

import { StackNavigationProp } from '@react-navigation/stack';
import Spinner from '../Components/Spinner';
import Question from './Question';

interface Cred {

}

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Home: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const [selectedQuestion, setQuestion] = React.useState<null | QUESTION>(null)
    const { loading, allQuestions } = useSelector((state: RootStateOrAny) => state.QuestionsReducer)

    React.useEffect(() => {
        dispatch(GetQuestions())
    }, [])

    React.useEffect(() => {
        //We can change the logic here to navigate through questions when the user answers a question
        if (allQuestions && allQuestions.length) setQuestion(allQuestions[0])
    }, [allQuestions])


    return (
        <View style={{ flex: 1, backgroundColor: Colors.backGround }}>
            <View style={{ height: '15%' }} />
            <View style={styles.container}>
                {loading ?
                    <Spinner size={true} />
                    :
                    <View style={styles.questionContainer}>
                        <Text style={{ color: Colors.secondary, fontSize: verticalScale(10) }}>Fill in the missing word</Text>
                        <Question selectedQuestion={selectedQuestion} />
                    </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopRightRadius: verticalScale(40),
        borderTopLeftRadius: verticalScale(40),
        backgroundColor: Colors.tertiary,
    }, questionContainer: {
        flex: 1,
        marginTop: verticalScale(50),
        alignItems: 'center'
    }
})

export default Home