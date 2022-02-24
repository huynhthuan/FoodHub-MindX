import {Text, View} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import React from 'react';
import {NodePlayerView} from 'react-native-nodemediaclient';

const LiveStreamView = () => {
  return (
    <View flex-1 bg-primaryDark>
      <NodePlayerView
        style={{height: 200}}
        inputUrl={'rtmp://localhost:1935/live/thuan'}
        scaleMode={'ScaleAspectFit'}
        bufferTime={300}
        maxBufferTime={1000}
        autoplay={true}
      />
    </View>
  );
};

export default LiveStreamView;

const styles = StyleSheet.create({});
