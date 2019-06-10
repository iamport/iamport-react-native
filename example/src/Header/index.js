import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Grid, Col, Button, Icon, Title } from 'native-base';

import NavigationService from '../NavigationService';

export default function Header({ title }) {
  const { container, icon, text } = styles;
  return (
    <Grid style={container}>
      <Col size={1}>
        <Button transparent onPress={() => NavigationService.back()}>
          <Icon name='arrow-back' style={icon} />
        </Button>
      </Col>
      <Col size={3}>
        <Title style={text}>{title}</Title>
      </Col>
      <Col size={1} />
    </Grid>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    maxHeight: 80,
    backgroundColor: '#344e81',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#fff',
  },
  text: {
    width: '100%',
    color: '#fff',
  },
});
