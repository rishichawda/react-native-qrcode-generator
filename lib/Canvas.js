"use strict";

var React = require("react");
var PropTypes = require("prop-types");
var createReactClass = require("create-react-class");

var { View, Platform } = require("react-native");
var { WebView } = require("react-native-webview");

function getRenderHTML(context, render, generator) {
  return `
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
    <style>
        *{margin:0;padding:0;overflow:hidden;}canvas{transform:translateZ(0);}
    </style>
    <canvas></canvas>
    <script>
        var canvas = document.querySelector('canvas');
        (${render}).call(${context}, canvas);
        (${generator}).call('', ${context} , canvas);
    </script>"
    `;
}

function generateImage(context, canvas) {
  if (!window.ReactNativeWebView.postMessage) {
    setTimeout(function () {
      generateImage.call(this, context, canvas);
    }, 100);
  } else {
    const image = document.createElement("canvas");
    const imageContext = image.getContext("2d");
    image.width = context.size;
    image.height = context.size;
    imageContext.fillStyle = context.bgColor;
    imageContext.fillRect(0, 0, context.size, context.size);
    imageContext.drawImage(canvas, 0, 0);
    window.ReactNativeWebView.postMessage(image.toDataURL());
  }
}

var Canvas = createReactClass({
  propTypes: {
    style: PropTypes.object,
    context: PropTypes.object,
    render: PropTypes.func.isRequired,
    onLoad: PropTypes.func,
    onLoadEnd: PropTypes.func
  },

  getImage: function(event) {
    if (this.props.generateImage) {
      this.props.generateImage(event.nativeEvent.data);
    }
  },

  render() {
    var contextString = JSON.stringify(this.props.context);
    var renderString = this.props.render.toString();
    var generate = generateImage.toString();
    return (
      <View style={this.props.style}>
        <WebView
          automaticallyAdjustContentInsets={false}
          scalesPageToFit={false}
          contentInset={{ top: 0, right: 0, bottom: 0, left: 0 }}
          source={{
            html: getRenderHTML(contextString, renderString, generate),
            baseUrl: ""
          }}
          opaque={false}
          underlayColor={"transparent"}
          overScrollMode="never"
          style={this.props.style}
          javaScriptEnabled={true}
          scrollEnabled={false}
          onLoad={this.props.onLoad}
          onLoadEnd={this.props.onLoadEnd}
          originWhitelist={["*"]}
          onMessage={this.getImage}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
});

module.exports = Canvas;
