import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomButton({label, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#181816',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 18,
          color: '#ee9a02',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}