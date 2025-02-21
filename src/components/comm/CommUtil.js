// CommUtil.js
import * as THREE from "three";

class CommUtil {
  // Position 관련 Object를 입력 받아, 좌표를 Text로 반환
  static getPos2Text(object, toFixed = 3) {
    let rtnText = "";

    if (object === undefined || object.x === undefined) {
      return "getPos2Text() undefined object or X Position";
    }

    let strValue = object.x.toString();
    let isFixed = strValue.indexOf(".") != -1;
    let isAddComma = false; // 콤마를 넣을지를 판단할 변수
    const CHECK_EMPTY = false; // 값이 없을 경우 임의 문자열을 넣을지 여부

    // x Point가 있을 경우
    if (!(typeof object.x == "undefined")) {
      if (isFixed) rtnText += object.x.toFixed(toFixed);
      else rtnText += object.x;
      isAddComma = true;
    } else if (CHECK_EMPTY) {
      rtnText += "x";
      isAddComma = true;
    }

    if (isAddComma) {
      rtnText += ", ";
      isAddComma = false;
    }

    // y Point가 있을 경우
    if (!(typeof object.y == "undefined")) {
      if (isFixed) rtnText += object.y.toFixed(toFixed);
      else rtnText += object.y;
      isAddComma = true;
    } else if (CHECK_EMPTY) {
      rtnText += "y";
      isAddComma = true;
    }

    if (isAddComma) {
      rtnText += ", ";
      isAddComma = false;
    }

    // Z Point가 있을 경우
    if (!(typeof object.z == "undefined")) {
      // 소수점 이하 자리수가 포함되어 있을 경우
      if (isFixed) rtnText += object.z.toFixed(toFixed);
      else rtnText += object.z;
      isAddComma = true;
    } else if (CHECK_EMPTY) {
      rtnText += "z";
      isAddComma = true;
    }

    if (isAddComma) {
      rtnText += ", ";
      isAddComma = false;
    }

    // w Point가 있을 경우
    if (!(typeof object.w == "undefined")) {
      // 소수점 이하 자리수가 포함되어 있을 경우
      if (isFixed) rtnText += object.w.toFixed(toFixed);
      else rtnText += object.w;
      isAddComma = true;
      /*
    } else if (CHECK_EMPTY) {
      rtnText += "w";
      isAddComma = true;
    */
    }

    if (isAddComma) {
      rtnText += ", ";
      isAddComma = false;
    }

    if (!(typeof object.order == "undefined")) {
      // 소수점 이하 자리수가 포함되어 있을 경우
      rtnText += object.order;
      isAddComma = true;
      /*
    } else if (CHECK_EMPTY) {
      rtnText += "w";
      isAddComma = true;
    */
    }

    return rtnText;
  }

  // 문자형("#00ff00")으로 되어 있는 Color 값을 숫자형(0x00FF00) 으로 변경하여 반환
  // Three.js에서는 "new THREE.Color"를 사용해도 됨
  static getColorHex(colorStr) {
    let colorNum = 0x0;
    if (colorStr.length == 7) colorNum = parseInt(colorStr.slice(1), 16);
    else if (colorStr.charAt(0) == "#")
      colorNum = parseInt(colorStr.slice(1), 16);
    return colorNum;
  }


  
  static getCurrTime() {
    const currentTime = new Intl.DateTimeFormat("ja-JP", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23", // 24시간 형식으로 설정
    }).format(new Date());

    return currentTime;
  }


  static log(message, context = "") {
    // const timestamp = new Date().toISOString();
    const currentTime = this.getCurrTime()

    const formattedMessage = `[${currentTime}] ${
      context ? `[${context}] ` : ""
    }${message}`;
    console.log(formattedMessage);
  }

  static debug(message, context = "") {
    this.log(`DEBUG: ${message}`, context);
  }

  static info(message, context = "") {
    this.log(`INFO: ${message}`, context);
  }

  static warn(message, context = "") {
    this.log(`WARN: ${message}`, context);
  }

  static error(message, context = "") {
    this.log(`ERROR: ${message}`, context);
  }





  /* Three.js 에서 사용하기 위한 함수들 */

  // Object에 대한 parent 명을 Text로 반환하여 출력 (scene, 현재 객체명 포함)
  static getObjectParentName(object, isUseScene=true, isUseThis=true) {
    let rtnText = "";

    const objParents = CommUtil.getObjectParents(object, isUseScene);

    if(objParents.length > 0) {
      let idx = 0;
      objParents.forEach((object) => {
        if(idx > 0) rtnText += " > ";
        rtnText += object.name;
        idx ++;
      });
    }

    if(isUseThis) rtnText += " > " + object.name;

    return rtnText;
  }

  // 현재 Object의 Parent 객체를 배열에 입력하여 반환
  static getObjectParents(object, isUseScene=true) {
    let rtnArray = [];

    let currObject = object;
    while(currObject.parent && currObject.parent.name) {
      if(isUseScene || !(currObject.parent.name == "Scene"))
        rtnArray.unshift(currObject.parent);
      currObject = currObject.parent;
    }

    return rtnArray;
  }

  // 현재 Object의 Child 객체를 배열에 입력하여 반환
  static getObjectChildName(object) {
    let rtnText = "";

    if(object.children.length > 0) {
      object.children.forEach((child, index) => {
        console.log(`Child ${index} : ${child.name}`);
        if(index > 0) rtnText += ", ";
        rtnText += child.name;        
      });
    }
    else {
      console.log(`${object.name}'s Child is Empty`);
    }

    return rtnText;
  }

  // 3D 객체의 사이즈를 반환
  static getObjectSize(object) {
    // 객체의 경계 상자를 계산하고, 그 크기를 얻는 데 유용
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    box.getSize(size); // 벡터에 x, y, z 방향의 크기를 할당

    return size;
  }

  // 3D 객체의 전체 크기를 반영하는 구의 반지름을 기반으로 크기를 측정하여 반환
  static getObjectRadius(object) {
    // 객체의 경계 상자를 계산하고, 그 크기를 얻는 데 유용
    const sphere = new THREE.Sphere();
    const box = new THREE.Box3().setFromObject(object);
    box.getBoundingSphere(sphere);

    // 2. BoundingSphere의 반지름을 얻음
    const radius = sphere.radius;
    return radius;
  }


  // 입력된 Object 들의 Hide 속성을 조회
  // intersectObjects 조회 시 부모는 Hide가 되었으나, 해당 객체는 Hide가 되지 않은 객체에 대한 Hide 처리를 위해서 사용
  static isParentVisible(object) {
    let rtnBool = true;

    if(!object.visible) {
      rtnBool = false;
    }
    else {
      let currObject = object;
      while(currObject.parent && currObject.parent.name) {
        if(!currObject.parent.visible) {
          rtnBool = false;
          break;
        }
        currObject = currObject.parent;
      }    
    }

    return rtnBool;

  }

  // SphereGeometry 의 Radius, Segment 값을 조정하여 반환
  // Marker에서 Point(구) 생성에 사용함
  static chkSphereGeometryParam(radius, segment) {

    let rtnRadius = 0.2;
    let rtnSegment = 30;

    if(radius === undefined || radius === null) {
      rtnRadius = 0.2;
      rtnSegment = 30;
    }
    else {
      rtnRadius = radius;
      if(segment === undefined || segment === null) {
        if(rtnRadius >= 1)  rtnSegment = 50;
        else if(rtnRadius >= 0.5)  rtnSegment = 30;
        else if(rtnRadius >= 0.1)  rtnSegment = 20;
        else if(rtnRadius >= 0.05)  rtnSegment = 15;
        else  rtnSegment = 10;        
      }
      else {
        rtnSegment = segment;
      }
    }

    return {radius:rtnRadius, segment:rtnSegment};

  }


}

export default CommUtil;
