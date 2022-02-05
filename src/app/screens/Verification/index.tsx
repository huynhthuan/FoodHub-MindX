import _ from 'lodash';
import {Button, Image, MaskedInput, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {Alert, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {getScreenWidth} from '../../utilities/helpers';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';

const Verification = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const [code, setCode] = React.useState('');

  const renderTimeText = (value: any) => {
    const paddedValue = _.padStart(value, 6, '*');
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
          Please type the verification code sent to 0932512365
        </Text>
        <View>
          <MaskedInput
            onChangeText={value => setCode(value)}
            value={code}
            keyboardType={'numeric'}
            renderMaskedText={renderTimeText}
            maxLength={6}
          />
          <Text gray4 marginB-32 style={styles.textResend}>
            I don’t recevie a code!<Text primary> Please resend</Text>
          </Text>
          <View center>
            <Button bg-primary style={styles.btnLogin} onPress={() => {}}>
              <Text white style={styles.btnLoginText}>
                Submit
              </Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
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
