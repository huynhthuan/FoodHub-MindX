import {Dimensions, NativeScrollEvent} from 'react-native';

const getScreenWidth = () => {
  return Dimensions.get('window').width;
};

const getScreenHeight = () => {
  return Dimensions.get('window').height;
};

const changeHeaderBackground = (
  nativeEvent: NativeScrollEvent,
  navigation: any,
) => {
  if (nativeEvent.contentOffset.y > 0) {
    navigation.setOptions({
      headerBackgroundContainerStyle: {
        backgroundColor: '#2D2D3A',
      },
      headerStyle: {
        backgroundColor: '#2D2D3A',
      },
    });
  } else {
    navigation.setOptions({
      headerBackgroundContainerStyle: {
        backgroundColor: 'transparent',
      },
      headerStyle: {
        backgroundColor: 'transparent',
      },
    });
  }
};

const getStatusOrder = (statusCode: string) => {
  let statusName = '';
  switch (statusCode) {
    case 'on-hold':
      statusName = 'Đang chuẩn bị';
      break;
    case 'completed':
      statusName = 'Đã hoàn thành';
      break;
    case 'arrival-shipment':
      statusName = 'Đang giao đồ';
      break;
    case 'pending':
      statusName = 'Chờ thanh toán';
      break;
    case 'cancelled':
      statusName = 'Đã hủy';
      break;
    default:
      break;
  }

  return statusName;
};

const getPaymentMethod = (paymentMethod: string) => {
  let paymentName = '';
  switch (paymentMethod) {
    case 'bacs':
      paymentName = 'Chuyển khoản ngân hàng';
      break;
    case 'cod':
      paymentName = 'Tiền mặt';
    case 'cheque':
      paymentName = 'Kiểm tra thanh toán';
      break;
    default:
      break;
  }

  return paymentName;
};

export {
  getScreenHeight,
  getScreenWidth,
  changeHeaderBackground,
  getStatusOrder,
  getPaymentMethod,
};
