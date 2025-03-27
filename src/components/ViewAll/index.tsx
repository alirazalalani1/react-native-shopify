import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {Flex, Typography} from '../index';
import {Colors, Metrix} from '../../config';

interface Props {
  text: string;
  showViewAll?: boolean;
}
const ViewAll = ({text, showViewAll}: Props) => {
  return (
    <Flex
      style={{
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        paddingBottom: Metrix.VerticalSize(10),
      }}
      mT={24}>
      <Typography bold size={18} color={Colors.primary}>
        {text}
      </Typography>

      {showViewAll && (
        <TouchableOpacity
          activeOpacity={Metrix.ActiveOpacity}
          hitSlop={Metrix.HitSlop}>
          <Typography size={15} medium color={'#d05278'}>
            View All
          </Typography>
        </TouchableOpacity>
      )}
    </Flex>
  );
};

export default ViewAll;

const styles = StyleSheet.create({});
