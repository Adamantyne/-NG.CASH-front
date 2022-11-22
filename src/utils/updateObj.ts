export default function updateObj(currentObj, newObj) {
    const obj = newObj;
    Object.keys(obj).forEach(key => {
        if (obj[key] === currentObj[key]) {
            delete obj[key];
        }
    });
    return obj;
}