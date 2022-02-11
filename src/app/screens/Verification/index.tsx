import _ from 'lodash';
import {
  Button,
  Image,
  Incubator,
  MaskedInput,
  Text,
  TouchableOpacity,
  View,

} from 'react-native-ui-lib';
import React from 'react';
import { KeyboardAvoidingView, LogBox, Platform, StyleSheet } from 'react-native';
import { getScreenWidth } from '../../utilities/helpers';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { MainStackParamList } from '../../../../App';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { useAppDispatch, useAppSelector } from '../../hook';
import { signUpState } from '../../redux/slices/userSignUpSlice';
import {
  BASE_URL_ACF_USER,
  BASE_URL_JWT_AUTH_GET_TOKEN,
  BASE_URL_WP_JSON_GET_NONCE,
  BASE_URL_WP_JSON_SIGN_UP,
} from '../../api/constants';
import { login } from '../../redux/slices/userSlice';
import Loading from '../../components/Overlay/Loading';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Verification = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const [code, setCode] = React.useState('');
  const route = useRoute<RouteProp<MainStackParamList, 'Verification'>>();
  const [isVisible, setIsVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const signUpState = useAppSelector(state => state.userSignUpSlice);
  const userState = useAppSelector(state => state.userSlice);
  const dispatch = useAppDispatch();
  const [isShowLoading, setIsShowLoading] = React.useState(false);

  async function verifyPhoneNumber(phoneNumber: string) {
    let confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    navigation.navigate('Verification', { confirmation });
  }

  const confirmCode = React.useCallback(
    async (signUpState: signUpState) => {
      console.log(signUpState);

      axios
        .get(BASE_URL_WP_JSON_GET_NONCE, {
          params: {
            controller: 'user',
            method: 'register',
          },
        })
        .then(res => {
          console.log(res.data);

          axios
            .get(BASE_URL_WP_JSON_SIGN_UP, {
              params: {
                username: signUpState.userName,
                user_pass: signUpState.password,
                email: signUpState.email,
                nonce: res.data.nonce,
              }
            })
            .then(res => {
              if (res.data.status === 'ok') {
                axios
                  .post(BASE_URL_JWT_AUTH_GET_TOKEN, {
                    username: signUpState.email,
                    password: signUpState.password,
                  })
                  .then(res => {
                    setIsShowLoading(false);
                    dispatch(login(res.data));
                    navigation.navigate('DashBoard');
                  })
                  .catch(function (error) {
                    setIsShowLoading(false);
                    setIsVisible(true);
                    setErrorMessage(
                      `${error.response.data.message.replace(/<[^>]*>?/gm, '')}`,
                    );
                  });
              }
              console.log(res.data);
            }).catch(error => {
              console.log('SIGUP', error);
            })
        }).catch(error => {
          console.log('GET NONCE', error);
        })

      // if (route.params.confirmation) {
      //   route.params.confirmation.confirm(code).then((res) => {

      //   }).catch(error => {
      //     console.log('VERIFY CODE', error);
      //     setIsVisible(true);
      //     setErrorMessage(`An error occurred, please try again or resend OTP.`);
      //   })
      // }
    },
    [code],
  );

  const resendCode = React.useCallback(async () => {
    setCode('');
    if (signUpState.phone) {
      verifyPhoneNumber(signUpState.phone);
    }
  }, [code]);

  const renderCodeText = () => {
    const paddedValue = _.padStart(code, 6, '*');
    const one = paddedValue.substring(0, 1);
    const two = paddedValue.substring(1, 2);
    const three = paddedValue.substring(2, 3);
    const four = paddedValue.substring(3, 4);
    const five = paddedValue.substring(4, 5);
    const six = paddedValue.substring(5, 6);

    return (
      <View spread marginB-32 row style={styles.codeWrap}>
        <Text style={styles.codeBox}>{one}</Text>
        <Text style={styles.codeBox}>{two}</Text>
        <Text style={styles.codeBox}>{three}</Text>
        <Text style={styles.codeBox}>{four}</Text>
        <Text style={styles.codeBox}>{five}</Text>
        <Text style={styles.codeBox}>{six}</Text>
      </View>
    );
  };

  return (
    <View flex bg-primaryDark padding-20>
      <View row spread style={styles.decorTop}>
        <Image assetName="signUpDecorTopLeft" assetGroup="images" />
        <Image assetName="signUpDecorTopRight" assetGroup="images" />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <Text white marginB-20 style={styles.title}>
          Vefification Code
        </Text>
        <Text gray2 marginB-32 style={styles.desc}>
          Please type the verification code sent to {signUpState.phone}
        </Text>
        <View>
          <MaskedInput
            onChangeText={value => {
              setCode(value);
            }}
            value={code}
            keyboardType={'numeric'}
            renderMaskedText={renderCodeText}
            maxLength={6}
          />
          <View marginB-32 row centerV>
            <Text gray4 style={styles.textResend} marginR-2>
              I don’t recevie a code!
            </Text>
            <TouchableOpacity
              onPress={() => {
                resendCode();
              }}>
              <Text primary textBold style={styles.textResend}>
                Please resend
              </Text>
            </TouchableOpacity>
          </View>

          <View center>
            <Button
              bg-primary
              style={styles.btnLogin}
              onPress={() => {
                confirmCode(signUpState);
              }}>
              <Text white style={styles.btnLoginText}>
                Submit
              </Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>

      <Incubator.Toast
        visible={isVisible}
        position={'bottom'}
        message={errorMessage}
        action={{
          label: 'Close',
          onPress: () => setIsVisible(false),
          labelProps: {
            style: {
              fontFamily: 'SofiaPro-Medium',
            },
          },
        }}
        zIndex={99}
        preset={Incubator.ToastPresets.FAILURE}
        onDismiss={() => {
          setIsVisible(false);
        }}
        autoDismiss={3500}
        messageStyle={{
          fontFamily: 'SofiaPro-Medium',
          fontSize: 16,
        }}
      />

      <Loading isShow={isShowLoading} />
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  decorTop: {
    width: getScreenWidth(),
    position: 'absolute',
  },
  bar: {
    width: 84,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  title: {
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 36.4127,
    lineHeight: 43.7,
  },
  desc: {
    fontSize: 13,
    maxWidth: 284,
    fontFamily: 'SofiaPro-SemiBold',
    lineHeight: 16.99,
  },
  input: {
    width: '100%',
    height: 65,
    lineHeight: 17,
    backgroundColor: '#393948',
    borderRadius: 14,
    marginBottom: 29,
    paddingHorizontal: 20,
    fontSize: 17,
    color: '#ffffff',
  },
  btnLogin: {
    height: 65,
    borderRadius: 28.5,
    width: 248,
  },
  btnLoginText: {
    fontSize: 15,
    textTransform: 'uppercase',
    fontFamily: 'SofiaPro-SemiBold',
  },
  textResend: {
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 16,
    lineHeight: 16,
  },
  codeWrap: {
    height: 60,
    width: '100%',
  },
  codeBox: {
    width: '15%',
    height: 60,
    backgroundColor: '#393948',
    fontSize: 27.2,
    fontFamily: 'SofiaPro-SemiBold',
    borderRadius: 14,
    textAlign: 'center',
    lineHeight: 60,
    color: '#FE724C',
  },
});
