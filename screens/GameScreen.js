import React, {
	useState,
	useRef,
	useEffect
} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	Alert,
	ScrollView,
	FlatList,
	Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenOrientation } from 'expo';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
// import MainButton from '../components/MainButton';
import PrimaryButton from '../components/PrimaryButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + 1;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
}

/* const renderListItem = (value, numOfRound) => (
	<View key={value} style={styles.listItem}>
		<BodyText>#{numOfRound}</BodyText>
		<BodyText>{value}</BodyText>
	</View>
); */

const renderListItem = (listLength, itemData) => (
	<View style={styles.listItem}>
		<BodyText>#{listLength - itemData.index}</BodyText>
		<BodyText>{itemData.item}</BodyText>
	</View>
);

const GameScreen = props => {

	// ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

	const initialGuess = generateRandomBetween(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	// const [rounds, setRounds] = useState(0);
	const [pastGuesses, setPastGuesses] = useState([initialGuess]);
	const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	useEffect(() => {
		const updateLayout = () => {
			setAvailableDeviceWidth(Dimensions.get('window').width);
			setAvailableDeviceHeight(Dimensions.get('window').height);
		};

		Dimensions.addEventListener('change', updateLayout);

		return () => {
			Dimensions.removeEventListener('change', updateLayout);
		};
	});

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);
	//useEffect(effect: React.EffectCallBack, deps:? React.DependencyList);
	// putting useEffect DependencyList. If changes DependencyList that runs otherwise it can't. 


	const nextGuessHandler = direction => {
		if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
			Alert.alert("Don\'t lie!", 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
			return;
		}

		if (direction === 'lower') {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess;
		}

		const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		//setRounds(curRounds => curRounds + 1);
		setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
	}

	// Using Dimensions API
	// if (Dimensions.get('window').height > 600) {
	// 	return <View>....</View>
	// }


	let listContainerStyle = styles.listContainer;

	if (availableDeviceWidth < 350) {
		listContainerStyle = styles.listContainerBig;
	}

	let gameControls = (
		<React.Fragment>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={{ ...styles.buttonContainer, marginTop: availableDeviceHeight > 600 ? 5 : 5 }}>
				<PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24} color="white" /></PrimaryButton>
				<PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons name="md-add" size={24} color="white" /></PrimaryButton>
			</Card>
		</React.Fragment>
	);

	if (availableDeviceHeight < 500) {
		gameControls = (
			<View style={styles.controls}>
				<PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24} color="white" /></PrimaryButton>
				<NumberContainer>{currentGuess}</NumberContainer>
				<PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons name="md-add" size={24} color="white" /></PrimaryButton>
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<Text style={DefaultStyles.title}>Opponent's Guess</Text>
			{gameControls}
			<View
				style={listContainerStyle}
			>
				{/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
				</ScrollView> */}
				<FlatList keyExtractor={(item) => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)}
					contentContainerStyle={styles.list}
				/>
			</View>
		</View >
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	buttonContainer: {
		// flexDirection: 'row',
		// justifyContent: 'space-between',
		// marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
		// width: 400,
		// maxWidth: '100%'

		flexDirection: 'row',
		justifyContent: 'space-around',
		width: 400,
		maxWidth: '90%'
	},
	buttonSmallContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
		width: 400,
		maxWidth: '100%'
	},
	controls: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '80%'
	},
	listContainer: {
		//width: Dimensions.get('window').width > 500 ? '60%' : '80%',
		width: '60%',
		flex: 1
	},
	listContainerBig: {
		width: '80%',
		flex: 1
	},
	list: {
		flexGrow: 1,
		//alignItems: 'center',
		justifyContent: 'flex-end',
	},
	listItem: {
		backgroundColor: '#fff',
		padding: 15,
		marginVertical: 10,
		borderColor: '#ccc',
		borderWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%'
	}
});

export default GameScreen;