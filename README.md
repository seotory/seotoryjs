# seotory script project
seotory **LOW LEVEL** script project.
인터파크의 core 스크립트 프로젝트입니다. 

> 하나의 js 파일 안에 하나의 일만을 한다

# setup
아래의 step 대로 따라해서 설치를 합니다. (어렵지 않아요. 겁먹지 마세요!)

## step.1 git & nodejs 설치
설치가 되어 있다면 다음 단계로 넘어갑니다. 설치가 안되어 있다면 꼭 설치해주세요.
- [git](https://git-scm.com/)
- [nodejs](http://nodejs.org/)

## step.2 npm global module 설치
이번 프로젝트에서는 build system 으로 [gulp](http://gulpjs.com/)를 이용합니다. 때문에 npm 글로벌 영역에 필수로 깔아줘야할 module이 있어요. 아래의 커맨드로 `gulp` module을 설치합니다.
```
npm install -g gulp
```

## step.3 git clone 복사
적당한 위치를 찾아서 리모트 클론을 합니다.
```
git clone https://github.com/seotory/seotoryjs.git seotory
```

## step.4 의존성 모듈 설치 및 시작
이제 npm의 package.json을 토대로 의존성 module을 받고 프로젝트를 빌드할꺼에요.
```
cd seotory
npm run build
```

## step.5 END
끝!


# gulp command
이번 프로젝트의 기본 명령어를 알아봅시다.

## gulp 또는 gulp dev
프로젝트의 js를 하나로합침 -> javascript문법검사 -> min 파일을 생성 -> phantomjs 로 유효성 검사 -> 후에 test 페이지 실시간 reload

## gulp bulid
프로젝트의 js를 하나로합침 -> javascript문법검사 -> min 파일을 생성

## gulp test
프로젝트의 결과물을 phantomjs 로 유효성 검사

---------------------------------------------

# API

[**API 문서 바로가기**]

