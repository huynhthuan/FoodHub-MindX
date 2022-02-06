import {
  Button,
  Image,
  Incubator,
  Picker,
  PickerItemValue,
  Text,
  View,
} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Controller, useForm} from 'react-hook-form';

const address = [
  {label: 'ABAP1', value: 'ABAP1'},
  {label: 'ABAP2', value: 'ABAP2'},
  {label: 'ABAP3', value: 'ABAP3'},
];

const FormDeliveryAddress = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      fullname: '',
      phone: '',
      state: '',
      city: '',
      street: '',
    },
  });

  const onSubmit = (data: any) => console.log(data);

  const onInvalid = (data: any) => {
    setIsVisible(true);
    setErrorMessage(
      `${data.fullname ? 'Full name: ' + data.fullname.message : ''}${
        data.phone ? '\n' + 'Phone: ' + data.phone.message : ''
      }${data.state ? '\n' + 'State: ' + data.state.message : ''}${
        data.city ? '\n' + 'City: ' + data.city.message : ''
      }${data.street ? '\n' + 'Street: ' + data.street.message : ''}`,
    );
  };

  return (
    <View>
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
        render={({field: {onChange, onBlur, value}}) => (
          <Incubator.TextField
            floatOnFocus={true}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            label={'Fullname'}
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
            label="Mobile number"
            labelStyle={styles.label}
            placeholder={'Enter your mobile number'}
          />
        )}
        name="phone"
      />

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'This field is required.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Picker
            value={value}
            enableModalBlur={false}
            onChange={onChange}
            topBarProps={{title: 'Select your state'}}
            showSearch
            searchPlaceholder={'Search your state'}
            renderPicker={(value: PickerItemValue, label: string) => (
              <View>
                <Incubator.TextField
                  style={styles.input}
                  value={label}
                  placeholderTextColor={'#ADADB8'}
                  label="State"
                  labelStyle={styles.label}
                  placeholder={'Select your state'}
                />
                <Image
                  assetName="arrowRightNormal"
                  assetGroup="icons"
                  style={styles.arrow}
                />
              </View>
            )}>
            {address.map(option => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        )}
        name="state"
      />

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'This field is required.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Picker
            value={value}
            enableModalBlur={false}
            onChange={onChange}
            topBarProps={{title: 'Select your city'}}
            showSearch
            searchPlaceholder={'Search your city'}
            renderPicker={(value: PickerItemValue, label: string) => (
              <View>
                <Incubator.TextField
                  style={styles.input}
                  value={label}
                  placeholderTextColor={'#ADADB8'}
                  label="City"
                  labelStyle={styles.label}
                  placeholder={'Select your city'}
                />
                <Image
                  assetName="arrowRightNormal"
                  assetGroup="icons"
                  style={styles.arrow}
                />
              </View>
            )}>
            {address.map(option => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        )}
        name="city"
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
            message: 'Your street must have at least 2 characters.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Incubator.TextField
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={'#ADADB8'}
            label="Street (Include house number)"
            labelStyle={styles.label}
            placeholder={'Enter your street'}
          />
        )}
        name="street"
      />

      <View center paddingH-25>
        <Button
          bg-primary
          style={styles.btn}
          onPress={handleSubmit(onSubmit, onInvalid)}>
          <Text white textSemiBold style={styles.btnText}>
            Save
          </Text>
        </Button>
      </View>

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

export default FormDeliveryAddress;

const styles = StyleSheet.create({
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
  btn: {
    height: 60,
    width: 248,
  },
  btnText: {
    fontSize: 15,
    textTransform: 'uppercase',
  },
  label: {
    fontFamily: 'SofiaPro',
    fontSize: 16,
    lineHeight: 16,
    color: '#ADADB8',
    marginBottom: 12,
  },
  arrow: {
    position: 'absolute',
    right: 27,
    bottom: 55,
  },
});
