import React from 'react';
import {
  ErrorToast,
  InfoToast,
  SuccessToast,
  ToastConfig,
  ToastProps,
} from 'react-native-toast-message';
import {Colors, fonts, Metrix} from '../config';

interface CustomToastProps extends ToastProps {
  text1?: string;
  text2?: string;
  hide?: () => void;
}

interface Props {
  ToastComponent: React.ComponentType<any>;
  color: string;
  text1: string | undefined;
  text2: string | undefined;
}

const CreateToast = ({ToastComponent, color, text1, text2}: Props) => {
  return (
    <ToastComponent
      contentContainerStyle={{paddingHorizontal: Metrix.HorizontalSize(15)}}
      text1NumberOfLines={3}
      text2NumberOfLines={3}
      text1Style={{
        fontSize: Metrix.customFontSize(16),
        fontWeight: fonts.bold().fontWeight,
        fontFamily: fonts.bold().fontFamily,
        color: color,
      }}
      text2Style={{
        fontSize: Metrix.customFontSize(12),
        fontWeight: fonts.medium().fontWeight,
        fontFamily: fonts.medium().fontFamily,
        color: Colors.black,
      }}
      text1={text1 ? text1.charAt(0).toUpperCase() + text1.slice(1) : ''}
      text2={text2}
    />
  );
};

const toastConfig: ToastConfig = {
  success: ({text1, text2}: CustomToastProps) => (
    <CreateToast
      ToastComponent={SuccessToast}
      color={Colors.green}
      text1={text1}
      text2={text2}
    />
  ),

  error: ({text1, text2}: CustomToastProps) => (
    <CreateToast
      ToastComponent={ErrorToast}
      color={Colors.danger}
      text1={text1}
      text2={text2}
    />
  ),

  info: ({text1, text2}: CustomToastProps) => (
    <CreateToast
      ToastComponent={InfoToast}
      color="#57b9ff"
      text1={text1}
      text2={text2}
    />
  ),
};

export default toastConfig;
