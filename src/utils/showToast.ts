import Toast from 'react-native-toast-message';

const showToast = ({type, text}: {type: string; text: string}) => {
  Toast.show({
    type: type,
    text1: type,
    text2: text,
  });
};

export default showToast;
