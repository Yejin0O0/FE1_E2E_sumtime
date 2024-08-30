# SumTime

## 🗂️ 서비스 기획 의도 및 컨셉

현대 사회에서는 시간 관리와 생산성 향상이 중요한 과제로 떠오르고 있습니다. 이에 우리는 사용자들이 효율적으로 시간을 관리하고, 일상 업무에서 최대의 생산성을 발휘할 수 있도록 돕는 타임트래커 서비스를 기획했습니다.

SumTime 서비스는 사용자의 일정을 체계적으로 관리하고, 각 활동에 소비되는 시간을 실시간으로 기록하여 시간 낭비를 최소화하고 목표 달성을 도와줍니다. 또한, 사용자의 일일 통계를 제공하여 사용자의 시간 활용 패턴을 시각적으로 제공하여 더 나은 시간 관리 전략을 수립할 수 있도록 돕습니다.

서비스의 주요 컨셉은 다음과 같습니다:

1. **간편한 시간 기록**: 사용자는 몇 번의 클릭만으로 각 활동에 소요된 시간을 쉽게 기록할 수 있습니다.
2. **데이터 시각화**: 시간 활용 패턴을 그래프 및 차트로 시각화하여 사용자가 자신의 시간 사용을 한눈에 파악할 수 있도록 합니다.

## 📷Screenshots
### Landing Page
![image](https://github.com/user-attachments/assets/62361230-458c-4591-96b5-5b5b6f6dd03f)

### Login Page
![image](https://github.com/user-attachments/assets/b04c90f5-0b66-4dba-b8a6-3e7caf86f564)

### Sign up Page
![image](https://github.com/user-attachments/assets/40e10d86-9647-4374-9de0-6aff33ba5e1c)

### Todo Page
<img width="955" alt="image" src="https://github.com/user-attachments/assets/0e19e6a9-d1e5-4e09-91b8-c0a371bb1289">


### MyPage
- Account
![image](https://github.com/user-attachments/assets/2a5c1ec1-ffbe-4a49-8a1a-4c395b46e31d)
- Category
- <img width="777" alt="image" src="https://github.com/user-attachments/assets/4ae185e9-5941-45de-9a87-67c8c51b4598">

- FAQ
  ![image](https://github.com/user-attachments/assets/2437ac90-0c0b-4aa7-9d87-7d03536ae5c1)



## ✅ 기능 정의

1. **회원가입**
   - 회원가입 성공 시 Login 페이지로 이동합니다.
2. **로그인**
   - 로그인 성공 시 Main 페이지로 이동합니다.
   - Main 페이지 기준 좌측에는 Timetable, 우측에는 Todo 리스트가 표시됩니다.
   - Todo 리스트의 생성, 수정, 삭제 과정은 모두 Modal 컴포넌트에서 진행됩니다.
3. **Todo 리스트**
   - Todo 항목들은 이름, 시작, 기록 버튼으로 구성됩니다.
   - 시간 기록이 진행 중일 때, 다른 Todo의 기록 버튼은 비활성화 됩니다.
   - 시간 기록이 완료되면, Record 버튼은 사라집니다.
     
   3-1. **Todo 생성**
     
   1. `Floating Action Button` 클릭 시 Create Modal이 생성됩니다. 여기서 생성 작업을 진행할 수 있습니다.
      생성 시에는 시간 기록이 불가하고, Record 버튼을 통해서만 시간을 기록할 수 있습니다.
      - 속성
        - **Required**
          - 제목
        - **Optional**
          - 설명
          - 카테고리 (카테고리가 없으면, 기본 카테고리로 설정됩니다.)
            
   3-2. **Todo 수정**

   1. Todo 항목 클릭 시 Modify Modal이 생성됩니다. 여기서 수정 작업을 진행할 수 있습니다.
      - 속성
        - **Required**
          - 제목
          - 시작 시간
          - 종료 시간
        - **Optional**
          - 설명
          - 카테고리 (카테고리가 없으면, 기본 카테고리로 설정됩니다.)
            
    3-3. **Todo 삭제**

     1. Todo 항목 클릭하여 Modify Modal을 열고, 우측 상단의 Delete 버튼을 눌러 Todo를 삭제할 수 있습니다.

    3-4. **Record 버튼을 클릭해 시작 시간과 종료 시간 기록**
   
    1. Record 버튼을 클릭하면 해당 Todo의 시간 기록이 진행됩니다.
       - 한 Todo의 시간을 기록 중일 경우, 다른 Todo의 Record 버튼은 비활성화됩니다.
    2. Record 버튼을 다시 클릭하면, 해당 Todo의 시간 기록이 종료되고, 시간이 기록됩니다.
       
    3-5. **Todo가 변경되면 타임 테이블에 바로 반영됩니다.**
   

5. **TimeTable**
   - Todo들 중, 시작시간과 종료시간이 있는 요소들은 TimeTable에 나타나게 됩니다.
   - TimeTable에는 Todo의 카테고리로 지정한 색상이 보여집니다.
6. **Calendar**
   - TodoList 상단의 날짜 우측 Dropdown 버튼을 누르면 달력이 표시됩니다.
   - 달력의 날짜를 클릭해 해당 날짜의 TodoList로 즉시 이동할 수 있습니다.
7. **Result Chart**
   - 사용자의 하루에서 사용한 시간을 그래프로 보여줍니다.
   - 카테고리별로 시간 합산을 진행하고, 리포트를 보여줍니다. 예) 식사 2시간, 여가 1시간, 공부 4시간 등등

8. **My Page**
   1. Account
     - 사용자의 정보를 확인하고 수정할 수 있습니다.
   2. Category
     - 카테고리 목록을 한 눈에 확인하고, 수정할 수 있습니다.
   4. FAQ
     - 자주 묻는 질문에 대한 정보가 담겨 있습니다.
   6. Logout
     - 로그아웃을 진행할 수 있습니다.
    

## 📚 기술 스택


- Next.js
- Next-Auth
- TanStack Query
- Redux
- Turso
- Drizzle

## 📌 협업 규칙
### Commit 네이밍 컨벤션

```jsx
기능: 구현 내용
```

ex) `feat: 가입 신청서 도메인 로직 구현` / `fix: lint 적용`

### Branch 네이밍 컨벤션

```jsx
//issue생성 후 자동으로 생성되는 추천 네이밍 사용
```

ex) (예시 하나 넣어주세요)


### PR 네이밍  컨벤션

```jsx
기능: 내용
```

ex) `feat: 회원가입 기능 추가`

### PR 내용 컨벤션

close 이슈 적어주기

```markdown
feat: 회원가입 기능 추가
-------------------------
템플릿 내용 따르기
작업 내용을 모르는 사람도 템플릿을 보고 작업 내용을 알 수 있게 성실히 작성!

```


### 코드 리뷰 컨벤션

- 리뷰 우선순위를 고려하여 코드 리뷰 진행
    - `NOW`: 해당 PR은 다른 사람의 작업에 영향을 주는 PR이므로 빠른 리뷰 필요
    - `BeforeLunch`: 점심 시간 전까지 리뷰 필요
    - `5PM`: 오후 5시 이전까지 리뷰 필요
- 리뷰어는 다음 항목을 유의하며 코드 리뷰 진행 ( [뱅크샐러드 코드문화 아티클](https://blog.banksalad.com/tech/banksalad-code-review-culture/) 참고했습니다. )
    - **P1:  꼭 반영해주세요 (Request changes)**
        
        버그와 잠재적인 버그로 인한 수정 필요시, 리뷰 요청자는 합리적인 의견을 기술해야 함
        
        코드 컨벤션(오타나 컴포넌트 선언 방식 등)을 틀렸을 경우에도 사용
        
    - **P2: 웬만하면 반영해 주세요 (Request changes)**
        
        PR된 코드보다 더 좋은 방식의 접근법과 코드가 있다고 생각하거나, 코드 품질을 위해 변경이 필요하다면 리뷰 요청자는 합리적인 의견을 기술해야 함
        
        ex) 구현했던 함수가 이미 존재한다 (함수 중복) 
        
        **로직을 hook으로 빼는 건 어떤가?(가독성) 등의 코드 품질에 대한 이야기.** 
        
        (변경된 코드를 보여준다) 이런 방식은 어떠세요? 가독성이 향상될 것 같습니다.
        
    - P3: 방식 제안 또는 의견 **(Comment)**
        
        기존 코드와는 다른 방식의 제안과 접근법을 제안할 때
        
        ex) hook 대신 **Query Options 을 사용하는 건 어떨까요?**
        
         기술적인 지식과 노하우를 공유할 때 사용
        
        (링크 참조) 이런 방식도 있더군요. 지금 동작도 문제는 없지만 이렇게 해도 괜찮을 것 같아요.
        
        코드에 대한 설명을 요구하거나 의문이 생겼을 때
        
        해당 코드를 가리키면서 이 코드가 어떻게 동작하는지에 대한 요구
        
        ex) 왜 이렇게 하셨죠? 다른 방식도 있지 않나요?
        
    - P4: **사소한 의견입니다 (Approve)**
        
        승인.


## 📌 Issue 네이밍 컨벤션

- Issue title은 영어로 작성합니다.
- Issue에 대한 설명은 내용을 통해 추가적으로 작성합니다.

```markdown
[기능] 이슈에서 다루는 내용(영어로)

기능의 종류
- `feat` -> 기능
- `refactor` -> 그냥 수정
- `fix` -> 에러 처리
- `hotfix` -> 급한일
- `perf` -> 최적화나 성능 향상
- `test` -> 테스트 코드
- `design` -> css 코드만 바꿨을 때
- `chore` -> 주석이나 패키지 뭔가 애매한거
- `docs` -> 문서 수정
```

## 📐 Wireframe

### 랜딩페이지

<img width="708" alt="landing page" src="https://github.com/user-attachments/assets/ffffb2fd-18f9-4205-94d6-140f911dc02c">

### Todo 페이지

<img width="708" alt="todo page" src="2">

### Todo 페이지 - Modal

<img width="708" alt="todo page - modal" src="https://github.com/user-attachments/assets/895aaeb2-f5db-4af6-993e-1d0ef294178f">

### 회원가입 페이지

<img width="708" alt="signup page" src="https://github.com/user-attachments/assets/dda03ffc-1853-4c04-8ca7-584c2ae27fc7">

### 로그인 페이지

<img width="708" alt="login page" src="https://github.com/user-attachments/assets/b1767b1e-ec34-4b9b-a0ad-60cdfdd25786">

## 🧩 ERD, DB 스키마
![image](https://github.com/user-attachments/assets/c3b32746-270b-46fe-bfa4-48b714a63c68)

