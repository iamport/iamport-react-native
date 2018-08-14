
import React from 'react';
import SvgUri from 'react-native-svg-uri';
import { ScrollView, View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

class Dropdown extends React.Component {
  state = {
    dropdownOpen: false
  }

  onPressSelectedValue = () => {
    const { selectedValue } = this.props;

    this.setState({ dropdownOpen: true });
  }

  onPressNewValue = (value) => {
    const { onPressValue } = this.props;

    this.setState({ dropdownOpen: false }, onPressValue(value));
  }

  renderOptions() {
    const { scroll, option, modal, text } = styles;
    const { selectedValue, options, onPressValue } = this.props;

    const OPTIONS = Object.keys(options).map((value, key) => {
      return (
        <TouchableWithoutFeedback 
          style={{
            ...option,
            backgroundColor: value === selectedValue ? '#ddd' : '#fff'
          }}
          key={key} 
          onPress={() => this.onPressNewValue(value)}
        >
          <Text style={text} >{options[value]}</Text>
        </TouchableWithoutFeedback>
      );
    });
    
    return <ScrollView style={scroll}>{OPTIONS}</ScrollView>
    // return (
    //   <Modal 
    //     visible={true}
    //     transparent={true}
    //     onRequestClose={() => console.log('haha')}
    //     supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
    //   >
    //     <ScrollView style={modal}>
    //       {OPTIONS}
    //     </ScrollView>
    //   </Modal>
    // );
  }

  render() {
    const { dropdownOpen } = this.state;
    const { options, selectedValue } = this.props;
    const { container, selectedOption, text, closeButton } = styles;
    
    return (
      <View style={container}>
        <TouchableOpacity style={selectedOption} onPress={this.onPressSelectedValue}>
          <Text style={text}>{options[selectedValue]}</Text>
          <SvgUri style={closeButton} source={require('../../img/triangle-down.svg')} />
        </TouchableOpacity>
        {dropdownOpen && this.renderOptions()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#888',
    width: 200,
    zIndex: 3,
    backgroundColor: '#fff',
    position: 'relative',
  },
  selectedOption: {
    flex: 1,
    height: 38,
    width: 200,
    paddingLeft: 10,
    paddingRight: 10,
  },
  scroll: { 
    width: 200,
    margin: 0,
    height: 190, 
    top: 38, 
    left: -1,
    position: 'absolute',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#888',
    padding: 0,
  },
  modal: { 
    width: 200,
    margin: 0,
    height: 190, 
    top: 38, 
    // left: -1,
    position: 'absolute',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#888',
    padding: 0,
  },
  option: {
    flex: 1,
    height: 38,
    width: 198,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: '#fafafa',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: (38 - 16)/2
  },
  text: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    height: 40,
    lineHeight: 40,
  }
});

export default Dropdown;