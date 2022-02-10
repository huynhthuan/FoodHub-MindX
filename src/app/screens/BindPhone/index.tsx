import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {Alert, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {getScreenWidth} from '../../utilities/helpers';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {Controller, useForm} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import {useAppDispatch, useAppSelector} from '../../hook';
import {signUpData} from '../../redux/slices/userSignUpSlice';

const BindPhone = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const [isVisible, setIsVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const signUpState = useAppSelector(state => state.userSignUpSlice);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      phone: '',
    },
  });

  async function verifyPhoneNumber(phoneNumber: string) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      dispatch(signUpData({...signUpState, phone: phoneNumber}));
      navigation.navigate('Verification', {confirmation});
    } catch (error) {
      setIsVisible(true);
      setErrorMessage(`${error}`);
    }
  }

  const onSubmit = async (data: any) => {
    verifyPhoneNumber(data.phone);
  };

  const onInvalid = (data: any) => {
    setIsVisible(true);
    setErrorMessage(`${data.phone ? 'Phone: ' + data.phone.message : ''}`);
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
          Bind Phone Number
        </Text>
        <Text gray2 marginB-32 style={styles.desc}>
          Enter your phone number to verify your account
        </Text>
        <View>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'This field is required.',
              },
              pattern: {
                value:
                  /(?:(?:\+?[0-9]\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$/i,
                message: 'Your phone incorrect format.',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Incubator.TextField
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={'#ADADB8'}
                keyboardType="phone-pad"
              />
            )}
            name="phone"
          />

          <View center>
            <Button
              bg-primary
              style={styles.btnLogin}
              onPress={handleSubmit(onSubmit, onInvalid)}>
              <Text white style={styles.btnLoginText}>
                Send
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
    </View>
  );
};

export default BindPhone;

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
});
