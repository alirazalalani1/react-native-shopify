import {StyleSheet, TouchableOpacity} from 'react-native';

import {Flex, Typography} from '../index';
import {Colors, Metrix} from '../../config';

interface Props {
  text: string;
  showViewAll?: boolean;
  mB?: number;
}
const ViewAll = ({text, showViewAll, mB = 0}: Props) => {
  return (
    <Flex style={styles.container} mT={32} mB={mB}>
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: Metrix.VerticalSize(10),
  },
});
