import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

import {Colors, Metrix} from '../../config';
import styles from './style';

const Step = ({step, i, activeStep, handlePress}) => {
  const isActive = activeStep === i;
  const isDone = activeStep > i;
  const isLastStep = i === steps.length - 1;

  const getStepperStyle = isActive => {
    if (isActive) return {backgroundColor: Colors.primary};
    return {backgroundColor: Colors.white};
  };

  const getTextColorstyle = (isActive, isDone) => {
    return {
      fontSize: Metrix.customFontSize(12),
      color: isActive ? Colors.white : isDone ? Colors.primary : Colors.grey,
    };
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => handlePress(i)}
      style={[
        styles.stepContainer,
        getStepperStyle(isActive),
        !isLastStep ? {marginRight: Metrix.HorizontalSize(-15)} : null,
        {zIndex: -1 * i},
      ]}>
      {isDone ? (
        <View style={styles.iconContainer}>
          <Icon
            name="check"
            size={Metrix.customFontSize(8)}
            color={Colors.white}
          />
        </View>
      ) : null}
      <Text style={[getTextColorstyle(isActive, isDone)]}>{step.label}</Text>
    </TouchableOpacity>
  );
};
export default Step;
