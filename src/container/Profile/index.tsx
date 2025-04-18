import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {useQuery} from '@apollo/client';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Flex, Typography} from '../../components';
import {Metrix, Colors} from '../../config';
import {GET_CUSTOMER} from '../../graphQL';
import {IRootState} from '../../store';

const Profile = () => {
  const {token} = useSelector((state: IRootState) => state.auth);
  const {data} = useQuery(GET_CUSTOMER, {
    variables: {customerAccessToken: token},
    skip: !token,
  });

  const customer = data?.customer;

  const address = customer?.defaultAddress;

  return (
    <View style={styles.container}>
      <Flex gap={16} style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          {customer?.image?.url ? (
            <Image source={{uri: customer.image.url}} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Icon name="person" size={40} color={Colors.white} />
            </View>
          )}
        </View>

        <View style={styles.userInfo}>
          <Typography size={20} bold>
            {customer?.firstName} {customer?.lastName}
          </Typography>
          <Typography color={Colors.textV2}>{customer?.email}</Typography>
        </View>
      </Flex>

      <View style={styles.section}>
        <Typography size={18} bold mB={16}>
          Account Details
        </Typography>

        <ProfileItem icon="email" label="Email" value={customer?.email} />
        <ProfileItem
          icon="phone"
          label="Phone"
          value={customer?.phone || 'Not provided'}
        />
        <ProfileItem
          icon="cake"
          label="Member Since"
          value={new Date(customer?.createdAt).toLocaleDateString()}
        />
      </View>

      <View style={styles.section}>
        <Typography size={18} bold mB={16}>
          Addresses
        </Typography>

        <TouchableOpacity style={styles.addressCard} onPress={() => {}}>
          <Typography bold>{address?.city}</Typography>
          <Typography>{address?.address1}</Typography>
          <Typography>
            {address?.city}, {address?.province}
          </Typography>
          <Typography>
            {address?.country}, {address?.zip}
          </Typography>
          {/* {address.phone && <Typography>Phone: {address.phone}</Typography>}  */}
        </TouchableOpacity>

        <Typography>No saved addresses</Typography>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => {}}>
        <Icon name="edit" size={20} color={Colors.primary} />
        <Typography color={Colors.primary}>Edit Profile</Typography>
      </TouchableOpacity>
    </View>
  );
};

const ProfileItem = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <Flex alignItems="center" mB={12}>
    <Icon
      name={icon}
      size={19}
      color={Colors.textV2}
      style={{width: Metrix.HorizontalSize(25)}}
    />
    <Flex>
      <Typography size={15} medium color={Colors.textV2}>
        {label}:
      </Typography>
      <Typography size={14} letterSpacing={0.3}>
        {' '}
        {value}
      </Typography>
    </Flex>
  </Flex>
);

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrix.HorizontalSize(24),
    backgroundColor: Colors.white,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: Metrix.VerticalSize(32),
  },
  avatarContainer: {
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  avatar: {
    width: Metrix.HorizontalSize(100),
    height: Metrix.HorizontalSize(100),
    borderRadius: Metrix.HorizontalSize(50),
  },
  avatarPlaceholder: {
    width: Metrix.HorizontalSize(100),
    height: Metrix.HorizontalSize(100),
    borderRadius: Metrix.HorizontalSize(50),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'center',
  },
  section: {
    marginBottom: Metrix.VerticalSize(24),
    paddingBottom: Metrix.VerticalSize(16),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  addressCard: {
    // backgroundColor: Colors.background,
    // padding: Metrix.HorizontalSize(16),
    // borderRadius: 8,
    marginBottom: Metrix.VerticalSize(12),
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Metrix.HorizontalSize(12),
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    marginTop: Metrix.VerticalSize(16),
  },
});
