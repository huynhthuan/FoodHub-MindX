import { Colors, Image, Incubator, Text, View } from 'react-native-ui-lib';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ItemReview from '../../components/Reviews/ItemReview';

const Reviews = () => {
    const renderItemReview = React.useCallback(
        ({ item }) => <ItemReview data={item} />,
        [],
    );

    return (
        <View flex bg-primaryDark paddingT-67 >
            <View paddingH-25 marginB-35>
                <View style={styles.inputWrap} row paddingT-10 paddingH-13 paddingB-13 centerV>
                    <View style={styles.imageWrap} marginR-17>
                        <Image assetName='avatar' assetGroup='images' style={styles.image} />
                    </View>
                    <Text textRegular gray5 style={styles.textInput}>Write your review...</Text>
                </View>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={[1, 2, 3, 4, 5, 6, , 7]}
                renderItem={renderItemReview}
                contentContainerStyle={
                    {
                        paddingHorizontal: 25
                    }
                }
            />
        </View>
    );
};

export default Reviews;

const styles = StyleSheet.create({
    inputWrap: {
        borderRadius: 12,
        borderWidth: 1,
        borderSyle: 'solid',
        borderColor: '#393948'
    },
    imageWrap: {
        width: 30,
        height: 30,
        borderRadius: 100,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    textInput: {
        fontSize: 14,
        lineHeight: 14
    }
});
