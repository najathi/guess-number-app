import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	Image,
	Dimensions,
	ScrollView,
	SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
// import MainButton from '../components/MainButton';
import PrimaryButton from '../components/PrimaryButton';

const GameOverScreen = props => {

	const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

	useEffect(() => {
		const updateLayout = () => {
			setAvailableDeviceWidth(Dimensions.get('window').width);
			setAvailableDeviceHeight(Dimensions.get('window').height);
		}

		Dimensions.addEventListener('change', updateLayout);

		return () => {
			Dimensions.removeEventListener('change', updateLayout);
		};

	});

	// const isPortrait = () => {
	// 	const dim = Dimensions.get('screen');
	// 	return dim.height >= dim.width;
	// };

	// const isLandscape = () => {
	// 	const dim = Dimensions.get('screen');
	// 	return dim.width >= dim.height;
	// };

	return (
		//<SafeAreaView>
		<ScrollView>
			<View style={styles.screen}>
				<TitleText>The Game is Over!</TitleText>
				<View style={{
					...styles.imageContainer, ...{
						width: availableDeviceWidth * 0.5,
						height: availableDeviceWidth * 0.5,
						borderRadius: (availableDeviceWidth * 0.5) / 2,
						marginVertical: availableDeviceHeight / 30
					}
				}}>
					<Image
						//fadeDuration={1000}
						source={require('../assets/success.png')}
						//source={{ uri: 'https://www.success.com/wp-content/uploads/2019/12/How-to-Align-Your-Career-With-Your-Personal-Definition-of-Success-1024x682.jpg' }}
						style={styles.image}
						resizeMode="cover" />
				</View>
				<View style={{
					...styles.resultContainer, ...{
						marginVertical: availableDeviceHeight / 60
					}
				}}>
					<BodyText style={{ ...styles.resultText, ...{ fontSize: availableDeviceHeight < 400 ? 16 : 20 } }}>Your Phone needed:
					<Text style={styles.highlight}> {props.roundsNumber}</Text> round to guess the number:
					<Text style={styles.highlight}> {props.userNumber}</Text>.
					</BodyText>
				</View>
				<View style={styles.buttonContainer}>
					<PrimaryButton onPress={props.onRestart}><Ionicons name="md-refresh-circle" size={24} color="white" /> NEW GAME</PrimaryButton>
				</View>
			</View>
		</ScrollView >
		//</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: Dimensions.get('window').height / 30
	},
	image: {
		width: '100%',
		height: '100%',
	},
	imageContainer: {
		width: Dimensions.get('window').width * 0.7,
		height: Dimensions.get('window').width * 0.7,
		borderRadius: Dimensions.get('window').width * 0.7 / 2,
		borderWidth: 3,
		borderColor: 'black',
		marginVertical: Dimensions.get('window').height / 30,
		overflow: 'hidden'
	},
	buttonContainer: {
		marginTop: 10
	},
	highlight: {
		color: Colors.primary,
		fontFamily: 'OpenSans-Bold',
	},
	resultText: {
		textAlign: 'center',
		fontSize: Dimensions.get('window').height < 400 ? 16 : 20
	},
	resultContainer: {
		marginHorizontal: 30,
		marginVertical: Dimensions.get('window').height / 60,
	}
});

export default GameOverScreen;