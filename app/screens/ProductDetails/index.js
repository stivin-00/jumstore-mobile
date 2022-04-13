import React from 'react';
import _ from 'lodash';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AlertHelper} from '../../utils/AlertHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addToCart, removeFromCart} from '../../redux/cartActions';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import Label from '../../components/Label';
import CustomButton from '../../components/CustomButton';
import {appColors} from '../../utils/appColors';
import Feather from 'react-native-vector-icons/Feather';
import TitleComp from '../../components/TitleComp';
import {ADD_TO_CART, CARTT_ADD_ITEM} from '../../redux/constants/cartConstants';
import {productDetail} from '../../utils/MockData';
import ReviewComp from '../../components/ReviewComp';
import BottomButtons from '../../components/BottomButtons';
import {connect} from 'react-redux';
import ReduxWrapper from '../../utils/ReduxWrapper';
const img = require('../../utils/images/profile.png');

function index({navigation, route: {params}}) {
  const {
    _id,
    name,
    description,
    price,
    countInStock,
    size,
    category,
    image,
    brand,
    rating,
    reviews,
  } = params.item;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    console.log('details====>', params.item);
  }, [params.item]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [qty, setQty] = useState(1);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [productId, setProductId] = useState(params.item._id);
  // eslint-disable-next-line react-hooks/rules-of-hooks

  // let unique = _.uniqWith(carttItems, _.isEqual);

  const setLocal = () => {
    const itemcart = {
      ...params.item,
    };
    console.log('data1', itemcart);
    AsyncStorage.getItem('wishlist')
      .then(datacart => {
        if (datacart !== null) {
          // We have data!!
          const cart = JSON.parse(datacart);
          cart.push(itemcart);
          let unique = _.uniqWith(cart, _.isEqual);
          AsyncStorage.setItem('wishlist', JSON.stringify(unique));
          AlertHelper.show('success', 'Product added to Wishlist');
          console.log('data2', unique);
        } else {
          const cart = [];
          cart.push(itemcart);
          let unique = _.uniqWith(cart, _.isEqual);
          AsyncStorage.setItem('wishlist', JSON.stringify(unique));
          AlertHelper.show('success', 'Product added to Wishlist');
          console.log('data3', unique);
        }
        alert('Add Cart');
      })
      .catch(err => {
        alert(err);
        AlertHelper.show('error', 'action failed, please try again');
        console.log('data4', err);
      });
  };

  const onAddToCartt = () => {
    try {
      dispatch(addToCart(productId, qty));
      AlertHelper.show('success', 'Product added to cart');
      console.log('product', productId);
      console.log('qty', qty);
    } catch (error) {
      AlertHelper.show('error', 'action failed, please try again');
      console.log('error', error);
    }
  };
  // render botton
  const _renderBottom = () => {
    return (
      <BottomButtons
        onPress={() => {
          onAddToCartt();
          // navigation.navigate('Cart');
        }}
        price={`₦${price}`}
        buttonLabel="ADD"
      />
    );
  };
  // review card
  const ReviewCard = ({item}) => {
    const {name, count, comment, rating} = item;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image style={styles.imgC} source={img} />

        <View style={{flex: 1}}>
          <View style={styles.labelNStarC}>
            <Label
              text={name}
              style={{fontSize: scale(16), fontWeight: '600'}}
            />
            <AirbnbRating
              size={15}
              count={rating}
              defaultRating={rating}
              isDisabled
              showRating={false}
              selectedColor={appColors.yellow}
              //style={{paddingVertical: 10,  }}
            />
          </View>
          <Text style={{flexWrap: 'wrap', color: appColors.black}}>
            {comment}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <Container bodyStyle={{paddingHorizontal: scale(0)}} isScrollable>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <ImageBackground
            style={{
              height: scale(210),
              marginTop: scale(40),
              marginLeft: scale(80),
              width: '73%',
              alignSelf: 'center',
            }}
            resizeMode="cover"
            source={{uri: `https://jumstore-store.herokuapp.com${image}`}}>
            <View
              style={{
                marginHorizontal: scale(0),
                marginLeft: scale(-80),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Pressable
                style={{
                  borderRadius: scale(25),
                  backgroundColor: appColors.white,
                  height: scale(45),
                  width: scale(45),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.goBack()}>
                <Feather
                  name="chevron-left"
                  size={scale(25)}
                  color={appColors.primary}
                />
              </Pressable>

              <Pressable
                onPress={setLocal}
                style={{
                  borderRadius: scale(25),
                  backgroundColor: appColors.white,
                  height: scale(45),
                  width: scale(45),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Feather
                  name="heart"
                  size={scale(20)}
                  color={appColors.primary}
                />
              </Pressable>
            </View>
          </ImageBackground>
        </View>
        <View style={{paddingHorizontal: scale(20), marginBottom: scale(100)}}>
          <View style={{paddingVertical: scale(20)}}>
            <Label
              text={name}
              style={{fontWeight: '500', fontSize: scale(20)}}
            />
          </View>

          <View
            style={{
              paddingVertical: scale(10),
              flexDirection: 'column',
              justifyContent: 'space-between',
              // alignItems: 'center',
            }}>
            <View style={styles.sizeContainer}>
              <Label text="Count In Stock :" style={{fontSize: scale(15)}} />
              <Label
                text={countInStock}
                style={{fontWeight: '700', fontSize: scale(15)}}
              />
            </View>
            <View style={styles.sizeContainer}>
              <Label text="Brand :" style={{fontSize: scale(15)}} />
              <Label
                text={brand}
                style={{fontWeight: '700', fontSize: scale(15)}}
              />
            </View>
            <View style={styles.sizeContainer}>
              <Label text="Category :" style={{fontSize: scale(15)}} />
              <Label
                text={category}
                style={{fontWeight: '700', fontSize: scale(15)}}
              />
            </View>
            <View style={styles.sizeContainer}>
              <Label text="Size:" style={{fontSize: scale(15)}} />
              <Label
                text={size}
                style={{fontWeight: '700', fontSize: scale(15)}}
              />
            </View>
            <View style={styles.sizeContainer}>
              <Label text="Rating :" style={{fontSize: scale(15)}} />

              <AirbnbRating
                size={15}
                count={5}
                defaultRating={rating}
                isDisabled
                showRating={false}
                selectedColor={appColors.yellow}
                //style={{paddingVertical: 10,  }}
              />
            </View>
          </View>

          <View style={{paddingVertical: scale(20)}}>
            <TitleComp heading={'Details'} />
            <View style={{paddingVertical: scale(20)}}>
              <Label
                text={description}
                style={{fontSize: scale(14), lineHeight: scale(25)}}
              />
            </View>
          </View>
          <View>
            <TitleComp heading={'Reviews'} />
            <Pressable
              onPress={() => navigation.navigate('WriteReview', {productId})}>
              <Label text="Write your review" style={styles.wrtitle} />
            </Pressable>
            <FlatList
              data={reviews}
              ItemSeparatorComponent={() => (
                <View style={{padding: scale(10)}} />
              )}
              renderItem={({item, index}) => (
                <ReviewCard key={index} item={item} />
              )}
            />
          </View>
        </View>
      </Container>
      {_renderBottom()}
    </>
  );
}

export default ReduxWrapper(index);

const styles = StyleSheet.create({
  sizeContainer: {
    flex: 0.47,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(5),
    backgroundColor: appColors.white,
    padding: scale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(20),
    borderWidth: scale(0.4),
    borderColor: appColors.gray,
  },
  itemColor: {
    height: scale(20),
    width: scale(20),
    backgroundColor: appColors.primary,
    borderRadius: scale(5),
  },
  wrtitle: {
    paddingVertical: scale(10),
    fontSize: scale(14),
    color: appColors.primary,
  },
  imgC: {
    borderRadius: scale(35),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    height: scale(55),
    width: scale(55),
    marginRight: scale(20),
  },
  labelNStarC: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(10),
  },
});
