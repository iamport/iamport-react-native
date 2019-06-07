import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function back() {
  _navigator.dispatch(
    NavigationActions.back()
  );
}

// add other navigation functions that you need and export them

export default {
  setTopLevelNavigator,
  navigate,
  back,
};