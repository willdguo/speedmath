"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function Game(_ref) {
  var score = _ref.score,
    setScore = _ref.setScore;
  var lower = 10;
  var upper = 100;

  // input box value - refreshes to '' upon correct answer
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    value = _useState2[0],
    setValue = _useState2[1];

  // question numbers & operator; first two indices = integers, third = operator
  var _useState3 = (0, _react.useState)([0, 0, 0]),
    _useState4 = _slicedToArray(_useState3, 2),
    question = _useState4[0],
    setQuestion = _useState4[1]; //add, minus, mult, div = 0, 1, 2, 3

  // user input -> checks if int, then checks if answer is right
  function handleValueChange(event) {
    var input = event.target.value;
    if (input == parseInt(input, 10)) {
      setValue(input);
      checkAnswer(parseInt(input, 10));
    } else if (input == '') {
      setValue(input);
    }
  }

  // if user input is correct, calls getRandomQuestion
  function checkAnswer(input) {
    console.log(input, question[2]);
    var correctAdd = question[2] == 0 && input == question[0] + question[1];
    var correctMinus = question[2] == 1 && input == question[0] - question[1];
    var correctMult = question[2] == 2 && input == question[0] * question[1];
    var correctDiv = question[2] == 3 && input == question[0] / question[1];
    if (correctAdd || correctMinus || correctMult || correctDiv) {
      getRandomQuestion();
      setValue('');
      setScore(score + 1);
    }
  }
  function getRandomAdd() {
    var rand1 = Math.floor(Math.random() * (upper - lower)) + lower;
    var rand2 = Math.floor(Math.random() * (upper - lower)) + lower;
    console.log('random add');
    console.log(rand1, rand2);
    setQuestion([rand1, rand2, 0]);
  }
  function getRandomMinus() {
    var rand1 = Math.floor(Math.random() * (2 * upper - lower)) + lower;
    var rand2 = Math.floor(Math.random() * (2 * upper - lower)) + lower;
    console.log('random minus');
    console.log(rand1, rand2);
    setQuestion([Math.max(rand1, rand2), Math.min(rand1, rand2), 1]);
  }
  function getRandomMult() {
    var rand1 = Math.ceil(Math.random() * Math.sqrt(2 * upper));
    var rand2 = Math.ceil(Math.random() * Math.sqrt(2 * upper));
    console.log('random mult');
    setQuestion([rand1, rand2, 2]);
  }
  function getRandomDiv() {
    var rand1 = Math.ceil(Math.random() * Math.sqrt(2 * upper));
    var rand2 = Math.ceil(Math.random() * Math.sqrt(2 * upper)) + 1;
    var val1 = rand1 * rand2;
    console.log('random div');
    setQuestion([val1, rand2, 3]);
  }
  function getRandomQuestion() {
    var questionType = [getRandomAdd, getRandomAdd, getRandomMinus, getRandomMinus, getRandomMult, getRandomDiv];
    var pickType = Math.floor(Math.random() * questionType.length);
    questionType[pickType]();
  }
  var operator = ['+', '-', 'x', '/'];
  window.addEventListener('load', function () {
    getRandomQuestion();
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "game"
  }, question[0], " ", operator[question[2]], " ", question[1], " = ", /*#__PURE__*/_react.default.createElement("input", {
    value: value,
    onChange: handleValueChange
  }));
}
var _default = Game;
exports.default = _default;