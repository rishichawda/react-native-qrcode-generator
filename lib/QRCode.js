"use strict";

var React = require("react");
var PropTypes = require("prop-types");
var createReactClass = require("create-react-class");
var Canvas = require("./Canvas.js");
var qr = require("qr.js");
var { View, ActivityIndicator } = require("react-native");

function renderCanvas(canvas) {
  var ctx = canvas.getContext("2d");
  var size = this.size;
  var fgColor = this.fgColor;
  var bgColor = this.bgColor;
  canvas.width = size;
  canvas.height = size;
  canvas.style.left = (window.innerWidth - size) / 2 + "px";
  if (window.innerHeight > size) {
    canvas.style.top = (window.innerHeight - size) / 2 + "px";
  }
  ctx.fillRect(0, 0, size, size);
  var cells = this.cells;
  var cellWidth = this.size / cells.length;
  var cellHeight = this.size / cells.length;
  var nRoundedWidth = Math.round(cellWidth);
  var nRoundedHeight = Math.round(cellHeight);
  cells.forEach(function(row, rowIndex) {
    row.forEach(function(column, columnIndex) {
      var nLeft = columnIndex * cellWidth;
      var nTop = rowIndex * cellHeight;
      ctx.fillStyle = ctx.strokeStyle = column ? bgColor : fgColor;
      ctx.lineWidth = 1;
      ctx.fillRect(nLeft, nTop, cellWidth, cellHeight);
      ctx.strokeRect(
        Math.floor(nLeft) + 0.5,
        Math.floor(nTop) + 0.5,
        nRoundedWidth,
        nRoundedHeight
      );
      ctx.strokeRect(
        Math.ceil(nLeft) - 0.5,
        Math.ceil(nTop) - 0.5,
        nRoundedWidth,
        nRoundedHeight
      );
    });
  });
}

function getDiff(x, y) {
  return Object.keys(x).some(value => x[value] !== y[value]);
}

var QRCode = createReactClass({
  PropTypes: {
    value: PropTypes.string,
    size: PropTypes.number,
    bgColor: PropTypes.string,
    fgColor: PropTypes.string,
    onLoad: PropTypes.func,
    onLoadEnd: PropTypes.func,
    getImageOnLoad: PropTypes.func
  },

  getDefaultProps: function() {
    return {
      value: "https://github.com/rishichawda/react-native-qrcode-generator",
      fgColor: "white",
      bgColor: "black",
      size: 128,
      onLoad: () => {},
      onLoadEnd: () => {},
      getImageOnLoad: () => {}
    };
  },

  componentDidUpdate: function(prev) {
    const hasChanged = getDiff(prev, this.props);
    if (hasChanged) {
      this.setState({ isLoading: true });
    }
  },

  getInitialState: function() {
    return { isLoading: true };
  },

  onLoadEnd: function() {
    this.setState(
      {
        isLoading: false
      },
      () => {
        this.props.onLoadEnd();
      }
    );
  },

  utf16to8: function(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x0001 && c <= 0x007f) {
        out += str.charAt(i);
      } else if (c > 0x07ff) {
        out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
      } else {
        out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
      }
    }
    return out;
  },

  render: function() {
    var size = this.props.size;
    var value = this.utf16to8(this.props.value);
    var styles = this.state.isLoading
      ? { width: 0, height: 0, overflow: "hidden" }
      : undefined;
    return (
      <>
        {this.state.isLoading && <ActivityIndicator />}
        <View style={styles}>
          <Canvas
            context={{
              size: size,
              value: this.props.value,
              bgColor: this.props.bgColor,
              fgColor: this.props.fgColor,
              cells: qr(value).modules
            }}
            generateImage={this.props.getImageOnLoad}
            render={renderCanvas}
            onLoad={this.props.onLoad}
            onLoadEnd={this.onLoadEnd}
            style={{ height: size, width: size }}
          />
        </View>
      </>
    );
  }
});

module.exports = QRCode;
