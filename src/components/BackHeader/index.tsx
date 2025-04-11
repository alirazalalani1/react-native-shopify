import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Metrix, SVGS} from '../../config';
import Flex from '../Flex';
import Typography from '../Typography';

const BackHeader = () => {
  return (
    <Flex
      style={{
        width: '100%',
        height: Metrix.VerticalSize(30),
        backgroundColor: Colors.lightgreen,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
      }}>
      <SVGS.BackIcon color={Colors.black} width={15} height={15} />
      <View>
        <SVGS.Cart width={20} height={20} />
      </View>
    </Flex>
  );
};

export default BackHeader;

const styles = StyleSheet.create({});
