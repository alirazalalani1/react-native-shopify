import React from 'react';
import {TextInput, TextStyle, ViewStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';

export type FlexProps = {
  mT?: number;
  mB?: number;
  children: React.ReactNode;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'stretch';
  gap?: number;
  flexWrap?: 'wrap' | 'nowrap';
  style?: ViewStyle;
};

export type ContainerProps = {
  pH?: number;
  children: React.ReactNode;
  headerTitle: string;
  headerSubText: string;
  backIcon?: boolean;
  contentContainerStyle?: Object;
  backIconHandler?: boolean;
  handleBackIcon?: () => void;
};

export interface InputFieldProps {
  value: string;
  onChange?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  focused?: boolean;
  Icon?: React.FC<SvgProps>;
  inputRef?: React.RefObject<TextInput>;
  isPassword?: boolean;
  autoFocus?: boolean;
  error?: string;
  inputStyle?: ViewStyle | TextStyle;
  rightBtn?: JSX.Element;
  disabled?: boolean;
  multiline?: boolean;
  numPad?: boolean;
  maxLength?: number;
}

export interface ProductItem {
  id?: string;
  node: {
    id: string;
    images: {
      edges: {node: {src: string}}[];
    };
    title: string;
    variants: {
      edges: {node: {priceV2?: {amount: string}}}[];
    };
  };
}

export interface ProductType {
  id: string;
  title: string;
  description: string;
  images: {src: string}[];
  availableForSale?: boolean;
  variants: {
    id: string;
    priceV2: {
      amount: string;
      currencyCode: string;
    };
  }[];
}

interface CustomerAddress {
  address1: string;
  city: string;
  province: string;
  country: string;
  zip: string;
}

interface Customer {
  firstName: string;
  lastName: string;
  phone: string;
  addresses: {
    nodes: CustomerAddress[];
  };
}

export interface CustomerDetailsResponse {
  customer?: Customer;
}
