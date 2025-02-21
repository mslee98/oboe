// API를 조회 하기 위한 주소
export const API_ROOT = "/api/";

// SSE를 조회 하기 위한 주소
export const SSE_ROOT = "/sse/";

// TMS API를 사용하여 화면을 구성할지 여부
// false일 경우 별도의 Backend를 구성하여 처리를 해야 함
export const TMS_API_USE = true;

// MENU API를 조회하기 위한 API 주소
// Local에서 vue.config.js에서 라우터 설정은 문제 없으나, 서버에서 Nginx Proxy 설정에 문제가 있어 FullPath 사용
// const TMS_API = "/api/";
// const TMS_API = "/TMS/";
// const TMS_API = "/tms/api/";
const TMS_API = "http://43.203.102.51/api/";

// 메뉴 목록을 조회가능한 API 주소 (메뉴명, 설명 을 조회)
export const TMS_API_MENU_LIST = TMS_API + "viewer/front/contents/list?padingYn=N"
//        + "&sCondition=name,description&sKeyword=ARENA"
       + "&sCondition=name,description&sKeyword=테스트"
        + "&sortBy=seq&sortOrder=asc";
export const TMS_API_MENU_INFO = TMS_API + "viewer/front/contents/info/";
export const TMS_API_GLB_DOWN = TMS_API + "atchmnfl/download/";


export const ASYNC_CHK_INTERVAL = 200;
export const ASYNC_CHK_MAX_LOOP = 150;  // Time(초) : ASYNC_CHK_INTERVAL * ASYNC_CHK_MAX_LOOP / 10;

