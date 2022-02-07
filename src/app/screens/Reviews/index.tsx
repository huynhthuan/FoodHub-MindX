import { Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ItemReview from '../../components/Reviews/ItemReview';
import { useNavigation, NavigationProp, useRoute, RouteProp, ParamListBase } from '@react-navigation/native';
import { MainStackParamList } from '../../../../App';

const Reviews = () => {
    const renderItemReview = React.useCallback(
        ({ item }) => <ItemReview data={item} />,
        [],
    );

    const navigation = useNavigation<NavigationProp<MainStackParamList>>();
    const route = useRoute<RouteProp<MainStackParamList, 'Reviews'>>();

    return (
        <View flex bg-primaryDark paddingT-67 >
            <View paddingH-24 marginB-35>
                <TouchableOpacity style={styles.inputWrap} row paddingT-10 paddingH-13 paddingB-10 centerV onPress={() => {
                    if (route.params.screenWriteReview === 'ReviewAgency') {
                        navigation.navigate('ReviewAgency')
                        return;
                    }
                    if (route.params.screenWriteReview === 'ReviewFood') {
                        navigation.navigate('ReviewFood')
                        return;
                    }
                }}>
                    <View style={styles.imageWrap} marginR-17>
                        <Image assetName='avatar' assetGroup='images' style={styles.image} />
                    </View>
                    <Text textRegular gray5 style={styles.textInput}>Write your review...</Text>
                </TouchableOpacity>
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
