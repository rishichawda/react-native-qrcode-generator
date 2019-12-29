#### This is a fork of [react-native-qrcode](https://github.com/cssivision/react-native-qrcode) with fixes and other enhancements since the original is not maintained anymore.

# react-native-qrcode
A react-native component to generate [QRcode](http://en.wikipedia.org/wiki/QR_code).

## Installation

```sh
npx install-peerdeps --save react-native-qrcode-generator
```

*(**Note** : If you want to use the original unmaintained package, [visit this link](https://github.com/cssivision/react-native-qrcode)).*

## Usage
```jsx
'use strict';

import React, { Component } from 'react'
import QRCode from 'react-native-qrcode-generator';

import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from 'react-native';

class HelloWorld extends Component {
  state = {
    text: 'http://facebook.github.io/react-native/',
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text: text})}
          value={this.state.text}
        />
        <QRCode
          value={this.state.text}
          size={200}
          bgColor='black'
          fgColor='white'/>
      </View>
    );
  };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);

module.exports = HelloWorld;
```

#### Output : 

<img src='qrcode.png' height = '256' width = '256'/>

##

## Available Props

prop      | type                 | Description
----------|----------------------|--------------
`value`   | `string`  ( **Default** : `http://facebook.github.io/react-native/` ) | Value of the QRCode. 
`size`    | `number` ( **Default** : `128` ) | Size of the qrcode / image.
`bgColor` | `string` ( **Default** : `white` ) | Background Color for the qrcode / image.
`fgColor` | `string` ( **Default** : `black` ) | Foreground Color for the qrcode / image.
`getImageOnLoad` | `function` | Returns the base64 png image data *( string )*.


## Licenses

All source code is licensed under the [MIT License](https://github.com/rishichawda/react-native-qrcode/blob/master/LICENSE).
