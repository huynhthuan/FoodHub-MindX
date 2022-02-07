import { Image, Text, View } from 'react-native-ui-lib';
import React from 'react';
import { StyleSheet } from 'react-native';

export interface IItemReview {
    data: any
}

const ItemReview = ({ data }: IItemReview) => {
    return (
        <View marginB-30>
            <View row marginB-16 centerV>
                <View marginR-18>
                    <View style={styles.imageWrap}>
                        <Image assetName='avatar' assetGroup='images' style={styles.image} />
                    </View>
                    <View center style={styles.rateBox}>
                        <Text white textSemiBold style={styles.rate}>5.0</Text>
                    </View>
                </View>

                <View>
                    <Text white textRegular style={styles.name} marginB-5>Alyce Lambo</Text>
                    <Text gray2 textRegular style={styles.date}>25/06/2020</Text>
                </View>
            </View>

            <Text gray2 textRegular style={styles.comment}>
                Really convenient and the points system helps benefit loyalty. Some mild glitches here and there, but nothing too egregious. Obviously needs to roll out to more remote.
            </Text>
        </View>
    );
};

export default ItemReview;

const styles = StyleSheet.create({
    imageWrap: {
        width: 48,
        height: 48,
        borderRadius: 100,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    rateBox: {
        width: 18.23,
        height: 18.23,
        borderRadius: 6,
        backgroundColor: '#FFC529',
        position: 'absolute',
        bottom: -4.7,
        right: -4.81
    },
    rate: {
        fontSize: 8.56
    },
    name: {
        fontSize: 15,
        lineHeight: 15
    },
    date: {
        fontSize: 12,
        lineHeight: 12
    },
    comment: {
        fontSize: 15,
        lineHeight: 19.61
    }
});
