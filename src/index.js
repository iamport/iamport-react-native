
import { Platform } from 'react-native';
import { setCustomSourceTransformer } from 'react-native/Libraries/Image/resolveAssetSource';
import Payment from './components/Payment';
import Certification from './components/Certification';

// https://github.com/facebook/react-native/issues/505#issuecomment-273472688
setCustomSourceTransformer(function (resolver) {

  if (Platform.OS === 'android'
    && !resolver.serverUrl
    && !resolver.bundlePath
    && resolver.asset.type === 'html') {
    resolver.bundlePath = '/android_asset/';
  }

  return resolver.defaultAsset();
});

const IMP = {
  Payment,
  Certification
};

export default IMP;