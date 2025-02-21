/* //////////////////////////////////////////////////////////
CodeUtil.js
Frontend에서 사용하는 Code 정보를 일괄적으로 관리하기 위한 Class
향후 Backend에서 DB를 통하여 관리를 관리를 하여야 하나,
Backend 구현 전까지는 상수로 선언하여 사용
////////////////////////////////////////////////////////// */

const CODE_DISPLAY = ["active", "normal", "hide", "remove"];
const CODE_ACTION = ["chart", "video", "link", "image", "morph", "relation"];
const CODE_MARKER = ["line2d", "line3d"];

class CodeUtil {

    static getCodes(type) {
        let codes = [];
        switch(type) {
            case "display":
                codes = CODE_DISPLAY;
                break;
            case "action":
                codes = CODE_ACTION;
                break;
            case "marker_type":
                codes = CODE_MARKER;
                break;
        }
        return codes;
    }

    static getCode(type, index) {

        let codes = this.getCodes(type);

        if(index >= 0 && index < codes.length)
            return codes[index];
        else
            return "";
    }

}

export default CodeUtil;
