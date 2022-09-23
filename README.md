# FL_front_project

8/31

vue를 이용한 front와 node.js를 이용한 서버를 연결
http를 통한 통신이라 cors 에러 이슈가 있었으나 option 추가로 해결


9/14

vue chart.js 사용이 되지 않아 G chart로 변경
하지만 실행이 되지 않았는데, vue@2 버전이었기 때문. 공식문서 참고하여 /legacy 붙여 해결
영어 문서를 잘 읽어야한다.

9/23

axious로 전송받은 데이터를 fornt로 옮기려고 하는데, undefied 에러가 발생
원인은 변수명이었는데, 받는 변수의 이름을 const{data}로 고정해줘야 하는 것
