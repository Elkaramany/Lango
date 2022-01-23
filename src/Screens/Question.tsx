import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useSelector, useDispatch } from 'react-redux'
import { Colors, HEIGHT, WIDTH } from '../Config'
import { QUESTION } from '../Redux/Reducers/types'

interface Props {
    selectedQuestion: QUESTION | null
}

interface Option {
    item: string
}

const Question: React.FC<Props> = ({ selectedQuestion }) => {
    const CYAN = '#68dfe7'
    const [answer, setAnswer] = React.useState<null | string>(null)
    const [correct, setCorrect] = React.useState<null | boolean>(null)
    const [checker, setChecker] = React.useState({ buttonBG: CYAN, buttonText: Colors.secondary, containerBG: Colors.primary, })

    const renderOptions = ({ item }: Option) => {
        return (
            <TouchableOpacity
                onPress={() => setAnswer(item)}
                style={[styles.optionContainer, styles.shadow]}>
                <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
        )
    }

    const renderSecondLang = (item: string) => {
        if (item === 'missing word') {
            if (answer) {
                return (
                    <View
                        style={[styles.optionContainer, styles.shadow, { bottom: verticalScale(10), backgroundColor: checker.buttonBG }]}>
                        <Text style={[styles.optionText, { color: checker.buttonText }]}>{answer}</Text>
                    </View>
                )
            } else return <Text style={styles.firstLang}> _____________ </Text>
        }
        else {
            return (
                <Text style={styles.firstLang}> {item} </Text>
            )
        }
    }

    const checkAnswer = () => {
        if (answer === selectedQuestion?.secondLangWord) {
            setChecker({
                buttonText: Colors.secondary,
                buttonBG: CYAN,
                containerBG: CYAN
            })
            setCorrect(true)
        } else {
            setCorrect(false)
            setChecker({
                buttonText: Colors.secondary,
                buttonBG: Colors.gradientButton[1],
                containerBG: Colors.gradientButton[1]
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                {selectedQuestion?.firstLangText.map((item, index) => {
                    //Render the original translation
                    return (
                        <View key={index}>
                            <Text style={[styles.firstLang, { textDecorationLine: item === selectedQuestion?.firstLangWord ? 'underline' : 'none' }]}> {item} </Text>
                        </View>
                    )
                })}
            </View>
            <View style={{ flexDirection: 'row' }}>
                {selectedQuestion?.secondLangText.map((item, index) => {
                    //Render the second language translation with the missing word
                    return <View key={index}>{renderSecondLang(item)}</View>
                })}
            </View>
            <FlatList
                numColumns={2}
                data={selectedQuestion?.options}
                //Render the choices
                renderItem={renderOptions}
                keyExtractor={(item, index) => `${item}${index}`}
            />
            <View style={[styles.checkContainer, { backgroundColor: checker.containerBG }]}>
                <View style={{ marginBottom: verticalScale(30) }}>
                    {correct !== null &&
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginHorizontal: scale(30) }}>
                            <Text style={[styles.firstLang, { fontSize: verticalScale(12) }]}>{correct === true ? "Great job!" : `Answer: ${selectedQuestion?.secondLangWord}`}
                            </Text>
                            <Icon name={'flag'} size={verticalScale(20)} color={Colors.secondary} />
                        </View>
                    }
                    <TouchableOpacity
                        onPress={() => checkAnswer()}
                        style={[styles.checkButton, styles.shadow, { backgroundColor: checker.buttonBG, }]}>
                        <Text style={[styles.firstLang, { textAlign: 'center', color: checker.buttonText }]}>Check answer</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: verticalScale(50),
        alignItems: 'center',
    }, shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
    }, firstLang: {
        color: Colors.secondary,
        fontSize: verticalScale(20),
        marginVertical: verticalScale(15),
    }, optionContainer: {
        backgroundColor: Colors.secondary,
        padding: scale(15),
        margin: scale(20),
        borderRadius: scale(17),
    }, optionText: {
        fontSize: scale(15),
        color: Colors.tertiary,
        fontWeight: 'bold',
    }, checkContainer: {
        width: WIDTH,
        marginTop: 'auto',
    },
    checkButton: {
        paddingHorizontal: verticalScale(7),
        borderRadius: verticalScale(30),
        width: WIDTH * 0.8,
        alignSelf: 'center'
    }
})

export default Question