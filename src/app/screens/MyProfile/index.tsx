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
import {
  updateFirstName,
  updateLastName,
  updateUserAvatar,
} from '../../redux/slices/userSlice';
import {setLoading} from '../../redux/slices/loadingSlice';

const MyProfile = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const userState = useAppSelector(state => state.userSlice);
  const dispatch = useAppDispatch();
  const [progressUpload, setProgressUpload] = React.useState(0);
  const [showProgress, setShowProgress] = React.useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstname: userState.first_name,
      lastname: userState.last_name,
      phone: userState.phone,
      email: userState.user_email,
    },
  });

  const onSubmit = (data: any) => {
    dispatch(
      setLoading({
        isShown: true,
      }),
    );

    axios
      .post(
        BASE_URL_WP_API_USER + userState.id,
        {
          first_name: data.firstname,
          last_name: data.lastname,
        },
        {
          headers: {
            Authorization: 'Bearer ' + userState.token,
          },
        },
      )
      .then(res => {
        dispatch(
          setLoading({
            isShown: false,
          }),
        );
        dispatch(updateFirstName(data.firstname));
        dispatch(updateLastName(data.lastname));
        dispatch(
          showToast({
            isShown: true,
            msg: `Thay đổi thông tin thành công.`,
            preset: Incubator.ToastPresets.SUCCESS,
          }),
        );
      })
      .catch(error => {
        dispatch(
          setLoading({
            isShown: false,
          }),
        );

        dispatch(
          showToast({
            isShown: true,
            msg: 'Đã có lỗi xảy ra, vui lòng thử lại',
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  };

  const onInvalid = (data: any) => {
    dispatch(
      showToast({
        isShown: true,
        msg: `${data.firstname ? 'Họ: ' + data.firstname.message + '\n' : ''}${
          data.lastname ? 'Tên: ' + data.lastname.message + '\n' : ''
        }${data.phone ? 'Email: ' + data.phone.message : ''}`,
        preset: Incubator.ToastPresets.FAILURE,
      }),
    );
  };

  React.useEffect(() => {
    setValue('phone', userState.phone);
  }, [userState.phone]);

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
                              msg: `Tải ảnh đại diện thành công!`,
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
                message: 'Trường này không được bỏ trống.',
              },
              minLength: {
                value: 2,
                message: 'Họ của bạn ít nhất phải có 2 kí tự.',
              },
              maxLength: {
                value: 32,
                message: 'Họ của bạn tối đa 32 kí tự.',
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
                label={'Họ'}
                labelStyle={styles.label}
                placeholder={'Nhập họ của bạn'}
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
                message: 'Trường này không được bỏ trống.',
              },
              minLength: {
                value: 2,
                message: 'Tên của bạn ít nhất phải có 2 kí tự.',
              },
              maxLength: {
                value: 32,
                message: 'Tên của bạn tối đa 32 kí tự.',
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
                label={'Tên'}
                labelStyle={styles.label}
                placeholder={'Nhập tên của bạn'}
                placeholderTextColor={'#ADADB8'}
              />
            )}
            name="lastname"
          />

          <Controller
            control={control}
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
                placeholder={'Nhập email của bạn'}
                placeholderTextColor={'#ADADB8'}
                editable={false}
                selectTextOnFocus={false}
              />
            )}
            name="email"
          />

          {userState.phone === undefined || !userState.phone ? (
            <>
              <Text style={styles.label}>Số điện thoại</Text>
              <Button
                marginB-20
                bg-gray2
                onPress={() => {
                  navigation.navigate('BindPhone');
                }}>
                <Text white>Liên kết số điện thoại</Text>
              </Button>
            </>
          ) : (
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Incubator.TextField
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={'Số điện thoại'}
                  labelStyle={styles.label}
                  placeholderTextColor={'#ADADB8'}
                  keyboardType="phone-pad"
                  editable={false}
                  selectTextOnFocus={false}
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
                Lưu
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
