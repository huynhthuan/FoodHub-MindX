import {
  Button,
  Image,
  Incubator,
  ProgressBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import {getScreenWidth} from '../../utilities/helpers';
import {Controller, useForm} from 'react-hook-form';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAppDispatch, useAppSelector} from '../../hook';
import {showToast} from '../../redux/slices/toastSlice';
import FastImage from 'react-native-fast-image';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import axios from 'axios';
import {BASE_URL_WP_API_USER} from '../../api/constants';
import {updateUserAvatar} from '../../redux/slices/userSlice';

const MyProfile = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const userState = useAppSelector(state => state.userSlice);
  const dispatch = useAppDispatch();
  const [progressUpload, setProgressUpload] = React.useState(0);
  const [showProgress, setShowProgress] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      phone: '',
    },
  });

  const onSubmit = (data: any) => {};

  const onInvalid = (data: any) => {
    dispatch(
      showToast({
        isShown: true,
        msg: `${
          data.firstname ? 'First name: ' + data.firstname.message + '\n' : ''
        }${data.lastname ? 'Last name: ' + data.lastname.message + '\n' : ''}${
          data.phone ? 'Email: ' + data.phone.message : ''
        }`,
        preset: Incubator.ToastPresets.FAILURE,
      }),
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
        <ProgressBar
          progress={progressUpload}
          style={
            showProgress
              ? [styles.progressBar, styles.active]
              : styles.progressBar
          }
          fullWidth
        />
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
              <FastImage
                style={{
                  width: '100%',
                  height: '100%',
                }}
                source={{
                  uri: userState.avatar_url
                    ? userState.avatar_url
                    : 'https://secure.gravatar.com/avatar/c2b06ae950033b392998ada50767b50e?s=96&d=mm&r=g',
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
          <TouchableOpacity
            center
            bg-primaryDark
            style={styles.cameraWrap}
            onPress={async () => {
              const result = await launchImageLibrary({
                mediaType: 'photo',
                maxWidth: 100,
                maxHeight: 100,
              });

              if (result.assets) {
                const reference = storage().ref(result.assets[0].fileName);
                if (result.assets[0].uri) {
                  setShowProgress(true);
                  const task = reference.putFile(result.assets[0].uri);

                  task.on('state_changed', taskSnapshot => {
                    setProgressUpload(
                      (taskSnapshot.bytesTransferred /
                        taskSnapshot.totalBytes) *
                        100,
                    );
                  });

                  task.then(async () => {
                    if (result.assets) {
                      const url = await storage()
                        .ref(result.assets[0].fileName)
                        .getDownloadURL();

                      axios
                        .post(
                          BASE_URL_WP_API_USER + userState.id,
                          {
                            acf: {
                              avatar: url,
                            },
                          },
                          {
                            headers: {
                              Authorization: 'Bearer ' + userState.token,
                            },
                          },
                        )
                        .then(res => {
                          setProgressUpload(0);
                          setShowProgress(false);
                          dispatch(
                            showToast({
                              isShown: true,
                              msg: `Upload avatar successfully!`,
                              preset: Incubator.ToastPresets.SUCCESS,
                            }),
                          );

                          dispatch(updateUserAvatar(url));
                        })
                        .catch(error => {
                          dispatch(
                            showToast({
                              isShown: true,
                              msg: `${error.data}`,
                              preset: Incubator.ToastPresets.FAILURE,
                            }),
                          );
                        });
                    }
                  });
                }
              }

              console.log(result);
            }}>
            <Image assetName="camera" assetGroup="icons" />
          </TouchableOpacity>
        </View>

        <Text center white marginB-8 textSemiBold style={styles.name}>
          {userState.user_nicename}
        </Text>
        <Text center marginB-53 textRegular gray2 style={styles.email}>
          {userState.user_email}
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
                label={'First name'}
                labelStyle={styles.label}
                placeholder={'Enter your first name'}
                placeholderTextColor={'#ADADB8'}
              />
            )}
            name="firstname"
          />

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
                label={'Last name'}
                labelStyle={styles.label}
                placeholder={'Enter your last name'}
                placeholderTextColor={'#ADADB8'}
              />
            )}
            name="lastname"
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
                value={userState.user_email}
                label={'E-mail'}
                labelStyle={styles.label}
                placeholder={'Enter your email'}
                placeholderTextColor={'#ADADB8'}
                editable={false}
                selectTextOnFocus={false}
              />
            )}
          />

          {userState.phone !== null ? (
            <>
              <Text style={styles.label}>Phone number</Text>
              <Button
                marginB-20
                bg-gray2
                onPress={() => {
                  navigation.navigate('BindPhone');
                }}>
                <Text white>Bind phone number</Text>
              </Button>
            </>
          ) : (
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'This field is required.',
                },
                pattern: {
                  value: /(\+84|0[3|5|7|8|9])+([0-9]{9})\b/i,
                  message: 'Your phone incorrect format.',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Incubator.TextField
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={userState.phone}
                  label={'Phone Number'}
                  labelStyle={styles.label}
                  placeholderTextColor={'#ADADB8'}
                  keyboardType="phone-pad"
                />
              )}
              name="phone"
            />
          )}

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
  progressBar: {
    position: 'absolute',
    zIndex: 999,
    top: 0,
    width: '100%',
    opacity: 0,
  },
  active: {
    opacity: 1,
  },
});
