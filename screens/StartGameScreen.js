import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	Dimensions,
	ScrollView,
	KeyboardAvoidingView
} from 'react-native';

// Dimensions API - this is not a component. this able to find out how much width you have available.

import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
//import MainButton from '../components/MainButton';
import PrimaryButton from '../components/PrimaryButton';

const StartGameScreen = props => {

	const [enteredValue, setEnteredValue] = useState('');
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();
	const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

	const numberInputHandler = inputText => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ''));
	}

	const resetInputHandler = () => {
		setEnteredValue('');
		setConfirmed(false);
	}

	useEffect(() => {
		const updateLayout = () => {
			setButtonWidth(Dimensions.get('window').width / 4);
		}

		Dimensions.addEventListener('change', updateLayout);
		return () => {
			Dimensions.removeEventListener('change', updateLayout);
		};
	});

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert('Invalid number!',
				'Number has to be a number between 1 and 99.',
				[{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]);
			return;
		}
		setConfirmed(true);
		setSelectedNumber(chosenNumber);
		setEnteredValue('');
		Keyboard.dismiss();
	}

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<BodyText>You selected</BodyText>
				{/* <View>
					<Text>{selectedNumber}</Text>
				</View> */}
				<NumberContainer>{selectedNumber}</NumberContainer>
				{/* <Button title="Start Game" onPress={props.onStartGame.bind(this, selectedNumber)} /> */}
				<PrimaryButton onPress={props.onStartGame.bind(this, selectedNumber)}><Ionicons name="md-color-wand" size={24} /> START</PrimaryButton>
			</Card>
		);
	}

	return (
		<ScrollView>
			<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
				<TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
					<View style={styles.screen}>
						<TitleText style={styles.title}>Start a New Game!</TitleText>
						{/* <View style={styles.inputContainer}> */}
						<Card style={styles.inputContainer}>
							<Text style={styles.text}>Select a Number</Text>
							{/* <TextInput placeholder="Enter a number" style={styles.textInput} /> */}
							<Input
								style={styles.input}
								blurOnSubmit
								autoCapitalize="none"
								autoCorrect={false}
								keyboardType="number-pad"
								maxLength={2}
								onChangeText={numberInputHandler}
								value={enteredValue}
							/>
							<View style={styles.buttonContainer}>
								<View style={{ width: buttonWidth }}>
									<Button
										title="Reset"
										color={Colors.accent}
										onPress={resetInputHandler} />
								</View>
								<View style={{ width: buttonWidth }}>
									<Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
								</View>
							</View>
						</Card>
						{/* </View> */}
						{confirmedOutput}
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
		//justifyContent: 'flex-start'
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: 'OpenSans-Bold'
	},
	inputContainer: {
		//width: 300,
		//maxWidth: '80%',
		width: '80%',
		maxWidth: '95%',
		minWidth: 300,
		alignItems: 'center',
		// shadowColor: 'black',
		// shadowOffset: {
		// 	width: 0,
		// 	height: 2
		// },
		// shadowRadius: 6,
		// shadowOpacity: 0.26,
		// // shadow style is not working Android, Android works elevation
		// elevation: 8,
		// backgroundColor: 'white',
		// padding: 20,
		// //borderBottomLeftRadius: 10
		// borderRadius: 10
	},
	/* 	textInput: {
			borderBottomColor: 'black',
			borderWidth: 1,
			width: '100%',
			padding: 10,
			margin: 15,
		}, */
	input: {
		width: 50,
		textAlign: 'center',
		marginVertical: 20
	},
	buttonContainer: {
		flexDirection: "row",
		width: '100%',
		justifyContent: "space-between",
		paddingHorizontal: 15
	},
	button: {
		// width: 80,
		width: Dimensions.get('window').width / 4
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: 'center'
	},
	sample: {
		fontFamily: 'OpenSans-Regular'
	}
});

export default StartGameScreen;