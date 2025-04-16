import React, {useState} from 'react';
import {Platform, TextInput, TouchableOpacity, View} from 'react-native';

import {Colors, Metrix, SVGS} from '../../config';
import {Typography} from '../index';
import {InputFieldProps} from '../../config/type/appDataType';
import styles from './styles';

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  focused,
  isPassword = false,
  inputRef,
  error,
  inputStyle,
  rightBtn,
  Icon,
  disabled,
  onSubmitEditing,
  multiline = false,
  numPad = false,
  maxLength,
  leftText,
}) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <>
      {/* <LinearGradient
        colors={focused ? gradientColors : [Colors.greyV2, Colors.greyV2]}
        start={{x: 0.5, y: 1}}
        end={{x: 0.5, y: 0}}
        style={styles.gradientWrapper}> */}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: disabled ? '#EAEAEA' : Colors.whiteV3,
            borderWidth: 1,
            borderColor: Colors.greyV2,
          },
        ]}>
        {leftText?.length > 0 && (
          <Typography size={15} mT={Platform.OS === 'ios' ? 1.5 : 0}>
            {leftText}
          </Typography>
        )}
        {Icon && (
          <Icon
            color={focused || value.length > 0 ? Colors.pinkV2 : Colors.greyV2}
          />
        )}

        <TextInput
          ref={inputRef}
          onChangeText={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
          style={[
            styles.input,
            {
              color: Colors.textV2,
              // fontFamily: value && fonts.bold().fontFamily,
            },
            {textAlignVertical: multiline ? 'top' : 'center'},
            {fontSize: Metrix.FontSmall},
            inputStyle,
            multiline && {
              minHeight: Metrix.VerticalSize(300),
              // maxHeight: Metrix.VerticalSize(96),
              paddingTop: Metrix.HorizontalSize(10),
              paddingBottom: Metrix.HorizontalSize(10),
              lineHeight: Metrix.HorizontalSize(20),
              borderRadius: 24,
            },
          ]}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor={focused ? Colors.pinkV2 : Colors.greyV2}
          secureTextEntry={isPassword && hidePassword}
          onSubmitEditing={onSubmitEditing}
          editable={!disabled}
          keyboardType={numPad ? 'numeric' : 'default'}
          maxLength={maxLength}
        />
        {isPassword && (
          <TouchableOpacity
            activeOpacity={Metrix.ActiveOpacity}
            onPress={() => setHidePassword(!hidePassword)}>
            {hidePassword ? (
              <SVGS.EyeClose color={focused ? Colors.pink : Colors.greyV2} />
            ) : (
              <SVGS.EyeOpen color={focused ? Colors.pink : Colors.greyV2} />
            )}
          </TouchableOpacity>
        )}

        {rightBtn && rightBtn}
      </View>
      {/* </LinearGradient> */}

      {error && (
        <Typography
          mT={12}
          medium
          letterSpacing={0.2}
          size={12}
          color={Colors.danger}>
          {error}
        </Typography>
      )}
    </>
  );
};

export default InputField;
