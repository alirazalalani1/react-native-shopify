import {useRef, useState} from 'react';
import {Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome6';

import {Colors, Metrix} from '../../config';
import styles from './style';

const Stepper = ({steps, getCategory}) => {
  const {width} = useWindowDimensions();
  const stepperRef = useRef<ScrollView>();
  const swiperRef = useRef<ScrollView>();
  const isTrustedRef = useRef(false);

  const [currentStep, setCurrentStep] = useState(0);
  const STEP_WIDTH = Metrix.HorizontalSize(135);

  const getTextColorStyle = (isActive: boolean, isDone: boolean) => {
    return {
      fontSize: Metrix.customFontSize(12),
      color: isActive ? Colors.black : isDone ? Colors.primary : Colors.black,
    };
  };

  const getStepperStyle = (isActive: boolean) => {
    if (isActive) return {backgroundColor: Colors.lightgreen};
    return {backgroundColor: Colors.white};
  };

  const scrollStepper = (index: number) => {
    stepperRef?.current?.scrollTo({
      x: index * STEP_WIDTH,
      animated: true,
    });
  };

  const scrollToIndex = (index: number) => {
    setCurrentStep(index);
    swiperRef?.current?.scrollTo({x: index * width, animated: true});
    scrollStepper(index);
  };

  const stepChangeHandler = (index: number) => {
    const roundedIndex = Math.round(index);
    setCurrentStep(roundedIndex);
    scrollStepper(roundedIndex);
  };

  return (
    <View>
      <ScrollView
        horizontal
        ref={stepperRef}
        style={{marginHorizontal: -16}}
        showsHorizontalScrollIndicator={false}
        pagingEnabled>
        <View style={styles.containerCommon}>
          {steps?.map((step, i) => {
            const isActive = currentStep === i;
            const isDone = currentStep > i;
            const isLastStep = i === steps.length - 1;
            return (
              <TouchableOpacity
                key={i}
                activeOpacity={1}
                onPress={() => {
                  scrollToIndex(i);
                  getCategory(step.node.handle, step.node.id);
                }}
                style={[
                  styles.stepContainer,
                  getStepperStyle(isActive),
                  !isLastStep
                    ? {marginRight: Metrix.HorizontalSize(-15)}
                    : null,
                  {zIndex: -1 * i},
                ]}>
                {/* {isDone ? (
                  <View style={styles.iconContainer}>
                    <Icon
                      name="check"
                      size={Metrix.customFontSize(8)}
                      color={Colors.white}
                    />
                  </View>
                ) : null} */}
                <Text style={[getTextColorStyle(isActive, isDone)]}>
                  {step.node.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* <ScrollView
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={() => {
          isTrustedRef.current = true;
        }}
        onScrollEndDrag={() => {
          setTimeout(() => {
            isTrustedRef.current = false;
          }, 150);
        }}
        horizontal
        pagingEnabled
        style={{marginHorizontal: -16}}
        ref={swiperRef}
        onScroll={event => {
          if (isTrustedRef.current) {
            const offstetX =
              event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width;
            const index = offstetX;
            stepChangeHandler(index);
          }
        }}>
        {steps.map((step, i) => {
          return (
            <ScrollView
              key={i}
              showsVerticalScrollIndicator={false}
              style={{
                maxHeight: Metrix.VerticalSize(550),
                paddingHorizontal: 16,
                width: width,
              }}>
              {step.Component}
            </ScrollView>
          );
        })}
      </ScrollView> */}

      {/* <View style={{alignItems: 'flex-end'}}>
        <PrimaryButton
          label={currentStep == steps.length - 1 ? 'Done' : 'Next'}
          fontSize={sizer.fontScale(12)}
          btnStyle={{width: 76, height: 31, marginTop: 10}}
          onClick={() => {
            currentStep == steps.length - 1 ? handleBackToHome() : '';
            scrollToIndex(currentStep + 1);
            scrollStepper(currentStep);
          }}
        />
      </View> */}
    </View>
  );
};

export default Stepper;
