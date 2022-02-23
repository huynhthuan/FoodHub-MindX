import {Text, View} from 'react-native-ui-lib';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiaHV5bmgwMDEiLCJhIjoiY2t6emVxcm5lMDBhYzNkbmpxdWYzamlhcCJ9.dZcIg_bEKU6M0hfA-m3fZA',
);

export async function hasLocationPermission() {
  if (
    Platform.OS === 'web' ||
    Platform.OS === 'ios' ||
    (Platform.OS === 'android' && Platform.Version < 23)
  ) {
    return true;
  }
  const isGranted = await MapboxGL.requestAndroidLocationPermissions();

  console.log('isGranted', isGranted);
  return isGranted;
}

const CheckOrder = () => {
  const [permission, setPermission] = React.useState(false);
  React.useEffect(() => {
    const task = async () => {
      const per = await hasLocationPermission();
      setPermission(per);
    };
    task();
  }, [false]);

  const [myLocation, setMyLocation] = React.useState([0, 0]);
  const [choseenLocation, setChoseenLocation] = React.useState([]);

  return (
    <View>
      <View flex-1>
        <MapboxGL.MapView
          style={{flex: 1}}
          logoEnabled={false}
          attributionEnabled={false}
          onPress={event => {
            let coordinate = event.geometry.coordinates;
            console.log(coordinate);
            setChoseenLocation(coordinate);
          }}>
          <MapboxGL.UserLocation />
          <MapboxGL.Camera
            zoomLevel={16}
            centerCoordinate={[105.87380348712173, 20.984260858336953]}
          />
          <MapboxGL.PointAnnotation
            coordinate={[105.87380348712173, 20.984260858336953]}
            id="pt-ann"></MapboxGL.PointAnnotation>
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

export default CheckOrder;

const styles = StyleSheet.create({});
