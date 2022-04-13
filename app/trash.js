const BrandCard = ({item}) => {
  const {label, icon, products} = item;
  return (
    <View
      style={{
        borderRadius: scale(5),
        backgroundColor: appColors.white,
        flexDirection: 'row',
        paddingHorizontal: scale(20),
        paddingVertical: scale(20),
      }}>
      <View
        style={{
          marginRight: scale(10),
          backgroundColor: appColors.black,
          height: scale(40),
          width: scale(40),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: scale(20),
        }}>
        <Ionicons name={icon} size={scale(25)} color={appColors.white} />
      </View>
      <View>
        <Label text={label} style={{fontSize: scale(18), fontWeight: '600'}} />
        <Label
          text={products}
          style={{
            fontSize: scale(14),
            opacity: scale(0.4),
            marginTop: scale(5),
          }}
        />
      </View>
    </View>
  );
};
