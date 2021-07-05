import { StyleSheet } from 'react-native';

const viewStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
    zIndex: 1,
  },
  webViewContainer: {
    flex: 1,
    zIndex: 0,
  },
});

export default viewStyles;
