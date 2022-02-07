import { Button, Colors, Image, Incubator, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { getScreenWidth } from '../../utilities/helpers';
import _ from 'lodash';
import { rateText } from '../../utilities/constant';

const ReviewAgency = () => {
    const [rateNumber, setRateNumber] = React.useState(1);

    const renderStar = React.useCallback((star: number) => {
        let startVote = new Array(star).fill(null);
        let startUnVote = new Array(5 - star).fill(null);
        return (
            [
                _.map(startVote, (item, index) => <TouchableOpacity key={index} onPress={() => {
                    setRateNumber((index + 1))
                }} ><Image key={index} marginH-7 assetName='starReviewActive' assetGroup='icons' /></TouchableOpacity >),
                _.map(startUnVote, (item, index) => <TouchableOpacity key={index} onPress={() => {
                    setRateNumber((index + 1 + star))
                }} ><Image marginH-7 assetName='starReviewNormal' assetGroup='icons' /></TouchableOpacity>)
            ]
        )
    }, [rateNumber]);

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View marginB-65 paddingH-25 marginT-10>
                <View style={styles.imageWrap}>
                    <Image
                        assetName="avatar"
                        assetGroup="images"
                        style={styles.image}></Image>
                </View>
                <View center style={styles.agencyLogoWrap}>
                    <Image
                        assetGroup="images"
                        assetName="avatar"
                        style={styles.agencyImage}
                    />
                    <View center style={styles.agencyVerifyWrap}>
                        <Image
                            assetName="verify"
                            width={15.16}
                            height={15.16}
                            assetGroup="icons"
                        />
                    </View>
                </View>
            </View>

            <Text center marginB-8 white textSemiBold style={styles.agencyTitle}>
                Pizza Hut
            </Text>
            <Text center marginB-16 gray2 textRegular style={styles.agencyAddress}>
                4102 Pretty View Lanenda
            </Text>

            <View row centerV centerH marginB-30>
                <View marginR-6 style={styles.dotStatus}></View>
                <Text textRegular style={styles.textStatus}>
                    Order Delivered
                </Text>
            </View>

            <Text white textSemiBold style={styles.titleReview} marginB-27 center>Please Rate Delivery Service</Text>

            <Text primary textRegular center marginB-14 style={styles.textRate}>{rateText[rateNumber - 1]}</Text>

            <View row center marginB-44>
                {renderStar(rateNumber)}
            </View>

            <View paddingH-25 marginB-57>
                <Incubator.TextField spellCheck={false} textAlignVertical={'top'} multiline={true} containerStyle={styles.textArea} style={styles.textAreaWrap} />
            </View>

            <View paddingH-25 center>
                <Button style={styles.btn} bg-primary center>
                    <Text textSemiBold white style={styles.btnText}>Submit</Text>
                </Button>
            </View>
        </ScrollView>
    );
};

export default ReviewAgency;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryDark,
        paddingBottom: 30
    },
    imageWrap: {
        height: 146,
        overflow: 'hidden',
        borderRadius: 14,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    agencyLogoWrap: {
        width: 104,
        height: 104,
        borderRadius: 200,
        backgroundColor: Colors.primaryDark,
        position: 'absolute',
        bottom: -104 / 2,
        left: getScreenWidth() / 2,
        transform: [
            {
                translateX: -104 / 2,
            },
        ],
    },
    agencyImage: {
        width: 81.5,
        height: 81.5,
        borderRadius: 200,
        overflow: 'hidden',
    },
    agencyVerifyWrap: {
        position: 'absolute',
        width: 21.55,
        height: 21.55,
        borderRadius: 100,
        backgroundColor: Colors.primaryDark,
        bottom: 16.19,
        right: 17.19,
    },
    agencyTitle: {
        fontSize: 20,
        lineHeight: 20,
    },
    agencyAddress: {
        fontSize: 12,
        lineHeight: 12,
    },
    dotStatus: {
        width: 7,
        height: 7,
        borderRadius: 100,
        backgroundColor: Colors.green,
    },
    textStatus: {
        color: Colors.green,
        fontSize: 14,
    },
    titleReview: {
        fontSize: 18,
        lineHeight: 18,
    },
    textRate: {
        fontSize: 22,
        lineHeight: 22
    },
    textArea: {
        height: 168,
        backgroundColor: Colors.dark,
        borderRadius: 18.21,
        paddingHorizontal: 22,
        paddingVertical: 24
    },
    textAreaWrap: {
        color: '#fff',
        fontFamily: 'SofiaPro',
        fontSize: 16,
        lineHeight: 16
    },
    btn: {
        width: 248,
        height: 60
    },
    btnText: {
        fontSize: 15,
        lineHeight: 15,
        textTransform: 'uppercase'
    }
});
