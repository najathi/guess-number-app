import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const NumberContainer = props => {
	return (
		<View style={styles.container}>
			<Text style={styles.number}>{props.children}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: 'center',
		padding: 10,
		marginVertical: 10,
		borderWidth: 2,
		padding: 5,
		borderColor: Colors.accent,
		borderRadius: 5
	},
	number: {
		color: Colors.accent,
		fontSize: 22,
		padding: 5
	}
});

export default NumberContainer;

