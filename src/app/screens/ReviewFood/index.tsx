import { Button, Colors, Image, Incubator, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import _ from 'lodash';
import { rateText } from '../../utilities/constant';

const ReviewFood = () => {
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
            <View marginB-30 paddingH-25 marginT-10>
                <View style={styles.imageWrap}>
                    <Image
                        assetName="avatar"
                        assetGroup="images"
                        style={styles.image}></Image>
                </View>
            </View>

            <Text white textLight style={styles.titleReview} marginB-30 center>
                How was your last order Ground Beef
            </Text>

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

export default ReviewFood;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryDark,
        paddingBottom: 30
    },
    imageWrap: {
        height: 206,
        overflow: 'hidden',
        borderRadius: 14,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    titleReview: {
        fontSize: 31,
        lineHeight: 37.2,
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
