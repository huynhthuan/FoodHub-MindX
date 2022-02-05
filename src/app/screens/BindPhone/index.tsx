import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {Alert, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {getScreenWidth} from '../../utilities/helpers';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {Controller, useForm} from 'react-hook-form';

const BindPhone = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = (data: any) => {
    navigation.navigate('Verification');
  };

  const onInvalid = (data: any) => {
    Alert.alert('Errors', `${data.phone ? data.phone.message : ''}`, [
      {text: 'Close'},
    ]);
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
                value: /^[0-9]{10}$/i,
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
