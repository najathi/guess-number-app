import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import Colors from '../constants/colors';
import TitleText from '../components/TitleText';

const Header = props => {
	return (
		// <View style={styles.header}>
		<View style={{
			...styles.headerBase, ...Platform.select({
				ios: styles.headerIOS, android: styles.headerAndroid
			})
		}}>
			<TitleText style={styles.title}>{props.title}</TitleText>
		</View>
	);
}

const styles = StyleSheet.create({
	// header: {
	// 	width: '100%',
	// 	height: 90,
	// 	paddingTop: 36,
	// 	backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
	// 	borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
	// },
	headerBase: {
		width: '100%',
		height: 90,
		paddingTop: 36,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerAndroid: {
		backgroundColor: Colors.primary,
		borderBottomColor: 'transparent',
		borderBottomWidth: 0
	},
	headerIOS: {
		backgroundColor: 'white',
		borderBottomColor: '#ccc',
		borderBottomWidth: 1
	},
	title: {
		color: Platform.OS === 'ios' ? Colors.primary : '#fff'
	}
});

export default Header;