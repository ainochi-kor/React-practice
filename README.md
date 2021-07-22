# React-practice

> "A JavaScript library for building user interface."

## CSR

- JS가 전부 다운로드 되어 리액트 애플리케이션이 정상 실행되기 전까지는 화면이 보이지 않음
- JS가 전부 다운로드 되어 리액트 애플리케이션이 정상 실행된 후, 화면이 보이면서 유저가 인터렉션 가능

## SSR

- JS가 전부 다운로드 되지 않아도, 일단 화면은 보이지만 유저가 사용할 수 없음.
- JS가 전부 다운로드 되어 리액트 애플리케이션이 정상 실행된 후, 유저가 사용 가능

```js
// 1. 리액트 컴포넌트 => HTML Element 연결하기
import ReactDOM from "react-dom";

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  document.getElementById("hello-example")
);
```

```js
// 2. 리액트 컴포넌트 만들기
import React from "react";

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}
```

---

# 고전 프론트엔드

HTML로 문서구조를 잡고, CSS로 스타일을 입히고, JavaScript로 문서를 조작한다.

### 컴포넌트를 활용한 프론트엔드

: 컴포넌트를 정의하고 실제 DOM에 컴포넌트를 그려준다.

```js
const component = {
  message: "init",
  count: 0,
  render() {
    return `<p>${this.message} : ${this.count}</p>`;
  },
};

function render(rootElement, component) {
  rootElement.innerHTML = component.render();
}

//초기화
render(document.querySelector("#root"), component);

document.querySelector("#btn_plus").addEventListener("click", () => {
  component.message = "update";
  component.count = component.count + 1;

  render(document.querySelector("#root"), component);
});
```

## 컴포넌트

```js
import React from "react";

// Class
class ClassComponent extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}

// Function
function FunctionComponent() {
  return <div>Hello</div>;
}

// Arrow Function
const FunctionComponent = () => {
  return <div>Hello</div>;
};
```

## React.creactElement

```js
React.createElement(
  type, // 태그 이름 문자열 | 리액트 컴포넌트 | React.Fragment
  [props], // 리액트 컴포넌트에 넣어주는 데이터 객체
  [...children] // 자식으로 넣어주는 요소들
);
```

## React.Fragment

```js
ReactDOM.render(
  React.creactElement(React.Fragment, null, `type이 "React Fragment" 입니다.`),
  document.querySelector("#root")
);
```

## createElement - 순수 자바스크립트

```js
// 4. 복잡한 리액트 엘리먼트 모임
ReactDOM.render(
  React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      null,
      React.createElement("h1", null, "주제"),
      React.createElement(
        "ul",
        null,
        React.createElement("li", null, "React"),
        React.createElement("li", null, "Vue")
      )
    )
  ),
  document.querySelector("#root")
);
```

## JSX

: JSX 문법으로 작성된 코드는 순수한 JavaScript로 babel이 컴파일하여 사용한다.

```js
ReactDOM.render(
  <div>
    <div>
      <h1>주제</h1>
      <ul>
        <li>React</li>
        <li>Vue</li>
      </ul>
    </div>
  </div>,
  document.querySelector("#root")
);
```

- 가독성이 좋다
- babel 과 같은 컴파일 과정에서 문법적 오류를 인지하기 쉬움

## JSX 문법

- 최상위 요소는 하나여야 한다.
- 최상위 요소 리턴하는 경우, () 로 감싸야 한다.
- 자식들을 바로 렌더링하고 싶으면 <> 자식들 </> 를 사용한다. => Fragment
- 자바스크립트 표현식을 사용하려면, {표현식}을 이용한다.
- if 문을 사용할 수 없기에 삼항 연산자 혹은 && 을 사용
- style을 이용해 인라인 스타일링 가능
- class 대신 className 을 사용해 class 적용 가능
- 자식요소가 있으면 꼭 닫아야 하고, 없으면 열면서 닫아야 한다.

## Props와 State

- Props는 컴포넌트 외부에서 컴포넌트에서 주는 데이터이다.
- State는 컴포넌트 내부에서 변경할 수 있는 데이터
- 둘 다 변경이 발생하면, 랜더가 다시 일어날 수 있다.

## Render 함수

- Props와 State 를 바탕으로 컴포넌트를 그린다
- 그리고 Props와 State가 변경되면, 컴포넌트를 다시 그린다.
- 컴포넌트를 그리는 방법을 기술하는 함수가 랜더 함수이다.

```js
// Function
function Component(props) {
  return (
    <div>
      <h1>{props.message} 이것은 함수로 만든 컴포넌트 입니다.</h1>
    </div>
  );
}

Component.defaultProps = {
  // Function, Class 에서 사용 가능
  message: "기본값",
};

// Class
class Component extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.message} 이것은 함수로 만든 컴포넌트 입니다.</h1>
      </div>
    );
  }
  // 클래스 문법에서만 사용 가능한 방법
  static defaultProps = {
    message: "기본값",
  };
}

ReactDOM.render(
  <Component message="안녕하세요" />,
  document.querySelector("#root")
);
```

## Event Handling

- camelCase 로만 사용할 수 있다.

  > onClick, onMouseEnter

- 이벤트에 연결된 자바스크립트 코드는 함수이다.

  > 이벤트 = {함수}와 같이 쓴다

- 실제 DOM 요소들에만 사용 가능하다.
  > 리액트 컴포넌트에 사용하면, 그냥 props로 전달한다.

## Declarative (디클레러티브)

Initialization -> Mounting -> Updation -> Unmounting

## Component 생성 및 마운트

constructor -> componentWillMount -> render(최초 렌더) -> componentDidMount

## Component props, state 변경

componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate

### componentWillReceiveProps

- props를 새로 지정했을 때 바로 호출된다.
- 여기는 state의 변경에 반응하지 않는다.
- 여기서 props의 값에 따라 state를 변경해야 한다면 setState를 이용해 state를 변경한다.
- 그러면 다음 이벤트로 각각 가는 것이 아니라 한번에 변경된다.

### shouldComponentUpdate

- props || state 변경 시,
- newProps 와 newState를 인자로 호출
- return type이 boolean이고 true이면 render, false이면 render가 되지 않는다.
- default는 true

### componentWillUpdate

- 컴포넌트가 재 렌더링 되기 직전에 불린다.
- 여기선 setState 같은 것을 쓰면 안된다.

### componentDidUpdate

- 컴포넌트가 재 렌더링을 마치면 불린다.

## Component 언마운트

componentWillUnMount

```js
class App extends React.Component {
  state = {
    age: 39,
  };
  interval = null;

  constructor(props) {
    super(props);
    console.log("constructor", props);
  }

  render() {
    console.log("render");
    return (
      <div>
        <h2>
          Hello {this.props.name} - {this.state.age}
        </h2>
      </div>
    );
  }
  componentWillMount() {
    console.log("componentWillMount");
  }

  componentDidMount() {
    console.log("componentDidMount");

    this.interval = setInterval(() => {
      console.log("setInterval");
      this.setState((state) => ({
        ...state,
        age: state.age + 1,
      }));
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    return false; // 렌더가 됨 false 시 렌더가 안됨.
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate", nextProps, nextState);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate", prevProps, prevState);
  }

  componentWillUnMount() {
    clearInterval(this.interval);
  }
}

ReactDOM.render(<App name="Mark" />, document.querySelector("#root"));
```

## Component 라이프사이클 변경

- constructor
- ~~componentWillMount~~ => getDerivedStateFromProps
- render
- componentDidMount
- ~~componentWillReceiveProps~~ => getDerivedStateFromProps
- shouldComponentUpdate
- render
- ~~componentWillUpdate~~ => getSnapshotBeforeUpdate
- (dom에 적용)
- componentDidUpdate
- componentWillUnmount

---

# CRA (Create React App)

- react-script : CRA App
- @testing-library : 테스트를 도와주는 라이브러리
- web-vitals : 사이트에 대한 정보를 조사

- npm start : 개발자 모드 실행
- npm run build : Prod. 배포 파일 생성
- npx serve -s build : 서버를 켜는 것.
- npm test : Jest를 이용한 테스트 코드 실행
- npm run eject : CRA의 관리를 받을지 결정.

# ESLint

: 코딩 스타일을 맞출 수 있음.

## 초기 설정

> $ npm init -y  
> $ npm i eslint -D  
> $ npx eslint --init

- VS CODE에서 확장에 ESLint 검색 후 설치

> $ npx eslint index.js : 오류 확인
> $ npx eslint index.js --fix : 오류 수정

# Prettier

: An opinionated code formatter

> $ npm i prettier -D
> $ npx prettier index.js : 수정할 부분 확인
> $ npx prettier index.js --write : 수정

- VS CODE에서 확장에 prettier 검색 후 설치
- (상단 메뉴)파일 -> 기본 설정 -> 설정
- 검색창 "format" 검색
- Default Formatter를 Prettier로 변경
- Format on save 체크

### EsLint와 함께 사용 시, 설정

``` js
{
  ...
  "eslintConfig": {
    "extends": [
      "react-app",
      "pretter"
    ]
  }
  ...
}
```

# husky

: Git hooks made easy

> $ git init  
> $ npm i husky -D  
> $ npx husky install  
> $ npx husky add .husky/pre-commit "npm test"

# lint-staged
: Run linters on git staged files 

