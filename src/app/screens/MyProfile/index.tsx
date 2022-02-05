import {
  Button,
  Image,
  Incubator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import React from 'react';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {getScreenWidth} from '../../utilities/helpers';
import {Controller, useForm} from 'react-hook-form';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const MyProfile = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const [isVisible, setIsVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      fullname: '',
      email: '',
    },
  });

  const onSubmit = (data: any) => {};

  const onInvalid = (data: any) => {
    setIsVisible(true);
    setErrorMessage(
      `${data.fullname ? 'Full name: ' + data.fullname.message + '\n' : ''}${
        data.email ? 'Email: ' + data.email.message : ''
      }`,
    );
  };

  return (
    <>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 29,
        }}>
        <View style={styles.decor}>
          <Image
            assetName="decorProfile"
            assetGroup="images"
            style={styles.imageDecor}
          />
        </View>
        <View center marginT-86 marginB-13>
          <View center bg-primaryDark style={styles.wrap}>
            <View style={styles.imageWrap}>
              <Image
                assetName="avatar"
                assetGroup="images"
                style={styles.image}
              />
            </View>
          </View>
          <TouchableOpacity center bg-primaryDark style={styles.cameraWrap}>
            <Image assetName="camera" assetGroup="icons" />
          </TouchableOpacity>
        </View>

        <Text center white marginB-8 textSemiBold style={styles.name}>
          Eljad Eendaz
        </Text>
        <Text center marginB-53 textRegular gray2 style={styles.email}>
          okemon@gmail.com
        </Text>

        <View paddingH-25>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'This field is required.',
              },
              minLength: {
                value: 2,
                message: 'Your name must have at least 2 characters.',
              },
              maxLength: {
                value: 32,
                message: 'Your name must have a maximum of 32 characters.',
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: 'Your name must be letters.',
              },
            }}
            render={({
              field: {onChange, onBlur, value},
            }: {
              field: {
                onChange: any;
                onBlur: any;
                value: any;
              };
            }) => (
              <Incubator.TextField
                floatOnFocus={true}
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label={'Full name'}
                labelStyle={styles.label}
                placeholder={'Enter your full name'}
                placeholderTextColor={'#ADADB8'}
              />
            )}
            name="fullname"
          />

          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'This field is required',
              },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Incorrect email format.',
              },
            }}
            render={({
              field: {onChange, onBlur, value},
            }: {
              field: {
                onChange: any;
                onBlur: any;
                value: any;
              };
            }) => (
              <Incubator.TextField
                floatOnFocus={true}
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label={'E-mail'}
                labelStyle={styles.label}
                placeholder={'Enter your email'}
                placeholderTextColor={'#ADADB8'}
              />
            )}
            name="email"
          />

          <View center>
            <Button
              bg-primary
              style={styles.btnSave}
              onPress={handleSubmit(onSubmit, onInvalid)}>
              <Text white textSemiBold style={styles.btnSaveText}>
                Save
              </Text>
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>

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
    </>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D2D3A',
    flex: 1,
  },
  decor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: getScreenWidth(),
    height: getScreenWidth() / 2.2865,
  },
  imageDecor: {
    width: '100%',
    height: '100%',
  },
  wrap: {
    width: 108,
    height: 108,
    borderRadius: 200,
    overflow: 'hidden',
  },
  imageWrap: {
    width: 90,
    height: 90,
    overflow: 'hidden',
    borderRadius: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cameraWrap: {
    width: 27,
    height: 27,
    borderRadius: 100,
    overflow: 'hidden',
    position: 'absolute',
    right: getScreenWidth() / 2 - 40,
    bottom: 5,
    zIndex: 22,
  },
  name: {
    fontSize: 20,
    lineHeight: 20,
  },
  email: {
    fontSize: 12,
    lineHeight: 12,
  },
  label: {
    fontFamily: 'SofiaPro',
    fontSize: 16,
    lineHeight: 16,
    color: '#ADADB8',
    marginBottom: 12,
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
  btnSave: {
    width: 248,
    height: 57,
  },
  btnSaveText: {
    fontSize: 15,
    textTransform: 'uppercase',
  },
});
