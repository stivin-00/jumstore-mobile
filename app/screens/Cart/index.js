/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {AlertHelper} from '../../utils/AlertHelper';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from '../../redux/constants/cartConstants';
import {CARTT_ADD_ITEM} from '../../redux/constants/cartConstants';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import Label from '../../components/Label';
import {appColors} from '../../utils/appColors';
import {SimpleStepper} from 'react-native-simple-stepper';
import {bestSellersList} from '../../utils/MockData';
import BottomButtons from '../../components/BottomButtons';
import {SwipeListView} from 'react-native-swipe-list-view';
import Feather from 'react-native-vector-icons/Feather';
import CheckOutItem from '../../components/CheckOutItem';
import _ from 'lodash';
import {connect} from 'react-redux';
import {
  removeFromCart,
  subtractQuantity,
  addQuantity,
  emptyCart,
} from '../../redux/cartActions';
import {addToCart, removFromCart} from '../../redux/cartActions';
import ReduxWrapper from '../../utils/ReduxWrapper';
import {APP_CURRENY} from '../../utils/appConfig';
import Empty from '../../components/Empty';

function index({navigation}) {
  // const cartt = useSelector(state => state.carttItems);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  let unique = _.uniqWith(cart, _.isEqual);
  const price = unique
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  return (
    <>
      <Container>
        <View style={{flex: 1, paddingVertical: scale(30)}}>
          <SwipeListView
            ListEmptyComponent={() => (
              <Empty label={'Your Cart is empty, Pls go shopping'} />
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item.name}_${new Date().getTime()}`}
            ItemSeparatorComponent={() => <View style={{padding: scale(10)}} />}
            data={unique || []}
            renderItem={({item, index}) => (
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: appColors.lightGray,
                  borderRadius: scale(15),
                  //borderRadius: scale(  5 )
                }}>
                <Image
                  style={{
                    height: scale(100),
                    width: scale(100),
                    borderRadius: scale(5),
                    //backgroundColor:appColors.darkGray
                  }}
                  source={{
                    uri: `https://jumstore-store.herokuapp.com${item.image}`,
                  }}
                />

                <View
                  style={{
                    marginLeft: scale(10),
                    justifyContent: 'space-between',
                    paddingVertical: scale(10),
                  }}>
                  <Label
                    text={item.name?.substring(0, 20)}
                    style={{fontWeight: '600'}}
                  />
                  <Label
                    text={`₦${item.price}`}
                    style={{
                      fontSize: scale(18),
                      fontWeight: '500',
                      color: appColors.primary,
                    }}
                  />
                  <View style={styles.counterStyle}>
                    <Icon.Button
                      onPress={() => dispatch(subtractQuantity(item.product))}
                      name="ios-remove"
                      size={25}
                      fontWeight="800"
                      color="black"
                      backgroundColor="transperent"
                      style={{
                        borderRadius: 15,
                        backgroundColor: '#bbb',
                        height: 20,
                        width: 35,
                        alignself: 'center',
                        flex: 1,
                        justifyContent: 'center',
                        marginHorizontal: scale(10),
                        alignItems: 'center',
                      }}
                      iconStyle={{
                        marginRight: 0,
                        marginLeft: -5,
                        marginTop: -5,
                        fontSize: 30,
                      }}
                    />

                    <Text
                      style={{fontSize: scale(20), color: appColors.primary}}>
                      {item.qty}
                    </Text>

                    <Icon.Button
                      onPress={() => dispatch(addQuantity(item.product))}
                      name="ios-add"
                      size={25}
                      fontWeight="800"
                      color="black"
                      backgroundColor="transperent"
                      style={{
                        borderRadius: 15,
                        backgroundColor: '#bbbb',
                        height: 20,
                        width: 35,
                        alignself: 'center',
                        flex: 1,
                        justifyContent: 'center',
                        marginHorizontal: scale(10),
                        alignItems: 'center',
                      }}
                      iconStyle={{
                        marginRight: 0,
                        marginLeft: -5,
                        marginTop: -5,
                        fontSize: 30,
                      }}
                    />
                  </View>
                  {/* {renderBagge && renderBagge()} */}
                </View>
              </View>
            )}
            renderHiddenItem={({item, index}) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Pressable
                  style={{
                    borderRadius: scale(49),
                    left: scale(-15),
                    flex: scale(0.3),
                    backgroundColor: appColors.yellow,
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Feather
                    name={'star'}
                    size={scale(25)}
                    color={appColors.white}
                  />
                </Pressable>
                <Pressable
                  onPress={() => dispatch(removeFromCart(item.product))}
                  style={{
                    borderRadius: scale(49),
                    left: scale(15),
                    flex: scale(0.3),
                    backgroundColor: appColors.redOrange,
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Feather
                    name={'trash'}
                    size={scale(25)}
                    color={appColors.white}
                  />
                </Pressable>
              </View>
            )}
            leftOpenValue={scale(85)}
            rightOpenValue={scale(-85)}
          />
        </View>
      </Container>

      <View style={{backgroundColor: 'red', bottom: scale(-10)}}>
        <BottomButtons
          onPress={() => navigation.navigate('Checkout')}
          buttonLabel={'CHECKOUT'}
          price={`₦${price}`}
        />
      </View>
    </>
  );
}
/*
const mapStateToProps = (state) => ({
  cartItems : state.cart.cartItems
});
const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(index); */
export default ReduxWrapper(index);

const styles = {
  counterStyle: {
    flex: 1,
    backgroundColor: '#BEBEBE',
    borderRadius: scale(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignself: 'center',
  },
};
